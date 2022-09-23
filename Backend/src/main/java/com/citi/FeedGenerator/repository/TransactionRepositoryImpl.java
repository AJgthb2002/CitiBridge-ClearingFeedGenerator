package com.citi.FeedGenerator.repository;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.regex.Pattern;
import com.opencsv.CSVWriter;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.regex.Matcher;
import com.citi.FeedGenerator.dto.Person;
import com.citi.FeedGenerator.dto.Transaction;

@Repository
public class TransactionRepositoryImpl implements TransactionRepository {

	@Autowired
	DataSource dataSource;

	@Autowired
	Transaction transaction;
	
	@Autowired 
	Person payer;
	
	@Autowired 
	Person payee;
	
	@Override
	public ArrayList<ArrayList<Transaction>> readFile(String fileName) {
		//returns array list containing all Transactions from file in object Transaction form

		ArrayList<Transaction> AllTransactionData = new ArrayList<>();
		ArrayList<ArrayList<Transaction>> validatedTransactions = null;
		String path = "src/main/resources/uploadedFiles/"+fileName;
		BufferedReader bufReader;

		try {
			bufReader = new BufferedReader(new FileReader(path));
			ArrayList<String> listOfLines = new ArrayList<>();

			String line;
			line = bufReader.readLine();
			while (line != null) 
			{
				if(!line.equalsIgnoreCase(""))
				{
					listOfLines.add(line);
				}
				line = bufReader.readLine();
			}

			for (String i: listOfLines) {

				String[] splitData = i.split("\\s+");	//check for more than one spaces while splitting

				transaction = new Transaction();

				String refNo = splitData[0].substring(0, 12);

				String date = splitData[0].substring(12,20);
				date = date.substring(0,2)+"/"+date.substring(2,4)+"/"+date.substring(4);
				payer = new Person();
				payer.setName(splitData[0].substring(20));
				payer.setAccount(splitData[1].substring(0,12));

				payee = new Person();
				payee.setName(splitData[1].substring(12));
				payee.setAccount(splitData[2]);
				double amount = Double.parseDouble(splitData[3]);

				transaction.setRefNo(refNo);
				transaction.setDate(date);
				transaction.setPayee(payee);
				transaction.setPayer(payer);	
				transaction.setAmount(amount);
				AllTransactionData.add(transaction);
			}
			bufReader.close();

			validatedTransactions = validate(AllTransactionData);

		} catch (IOException e) {
			e.printStackTrace();
		} 
		return validatedTransactions;
	}

	@Override
	public boolean isValid(Transaction transaction) {

		// TODO validate each paramenter of a transaction object 
		String refNo = transaction.getRefNo();
		String date = transaction.getDate();
		String payerName = transaction.getPayer().getName();
		String payerAccount = transaction.getPayer().getAccount();
		String payeeName = transaction.getPayee().getName();
		String payeeAccount = transaction.getPayee().getAccount();
		double amount = transaction.getAmount();


		//validate refNo - unique database 
		try(Connection connection = dataSource.getConnection();){
			
			String uniqueTransaction = "select * from transactions where refNo = ?";
			PreparedStatement preparedStatement = connection.prepareStatement(uniqueTransaction);   
			preparedStatement.setString(1, refNo);
			ResultSet resultSet = preparedStatement.executeQuery();

			if(resultSet.next())
			{
				transaction.setReason("Invalid Reference Number");
				return false;
			}

			connection.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}


		Pattern pattern1 = Pattern.compile("\\w{12}");
		Matcher matcher1 = pattern1.matcher(refNo);
		if(!(matcher1.matches()))
		{
			transaction.setReason("Invalid Reference Number");
			return false;
		}

		//validate date
		long millis=System.currentTimeMillis();  
        Date dateObj = new Date(millis);
 		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
 		String currentDate = formatter.format(dateObj);
 		
		if(!(currentDate.equals(date)))
		{
			transaction.setReason("Invalid Transaction Date");
			return false;
		}
			

		Pattern pattern2 = Pattern.compile("\\w{0,35}");
		Matcher matcher2 = pattern2.matcher(payerName);
		if(!(matcher2.matches()))
		{
			transaction.setReason("Invalid Payer Name");
			return false;
		}

		Matcher matcher3 = pattern1.matcher(payerAccount);
		if(!(matcher3.matches()))
		{
			transaction.setReason("Invalid Payer Account");
			return false;
		}
		
		Matcher matcher4 = pattern2.matcher(payeeName);
		if(!(matcher4.matches()))
		{
			transaction.setReason("Invalid Payee Name");
			return false;
		}

		Matcher matcher5 = pattern1.matcher(payeeAccount);
		if(!(matcher5.matches()))
		{
			transaction.setReason("Invalid Payee Account");
			return false;
		}

		String regex ="[0-9]{0,10}\\.[0-9]{0,2}";
		Pattern pattern3 = Pattern.compile(regex);
		String amounts = Double.toString(amount);
		Matcher matcher6 = pattern3.matcher(amounts);
		if(!matcher6.matches() || amount<0)
		{
			transaction.setReason("Invalid Amount");
			return false;
		}
		
		return true;
	}

	@Override
	public ArrayList<ArrayList<Transaction>> validate(ArrayList<Transaction> allTransactions) throws IOException{

		//create 2 arraylists - valid and invalid transactions
		ArrayList<ArrayList<Transaction>> validatedTransactions=new ArrayList<ArrayList<Transaction>>();
		ArrayList<Transaction> validTransactions = new ArrayList<Transaction>();
		ArrayList<Transaction> invalidTransactions = new ArrayList<Transaction>();
	
		for(int i=0;i<allTransactions.size();i++)
		{
			Transaction transaction=allTransactions.get(i);
			if(isValid(transaction))
			{
				//validate refNo - unique in current file 
				boolean flag = true;
				for(int j=0;j<i;j++)
				{
					if(transaction.getRefNo().equals(allTransactions.get(j).getRefNo()))
					{
						invalidTransactions.add(transaction);
						transaction.setReason("Invalid Reference Number");
						flag = false;
						break;
					}
				}
				if(flag)
					validTransactions.add(transaction);
			}
			else
			{
				invalidTransactions.add(transaction);
			}
		}
		validatedTransactions.add(validTransactions);
		validatedTransactions.add(invalidTransactions);

		//save all valid transactions to database
		saveValidTransactions(validTransactions);
		return validatedTransactions;
	}


	@Override
	public boolean saveValidTransactions(ArrayList<Transaction> validTransactions) throws IOException{

		boolean isSaved=false;
		try(Connection connection = dataSource.getConnection();){
			connection.setAutoCommit(false); 
			String insertTransaction = "insert into transactions values(?,?,?,?,?,?,?)";
			PreparedStatement preparedStatement = connection.prepareStatement(insertTransaction);            
			for(Transaction transaction : validTransactions) 
			{
				preparedStatement.setString(1, transaction.getRefNo());
				preparedStatement.setString(2, transaction.getDate());
				preparedStatement.setString(3, transaction.getPayer().getName());
				preparedStatement.setString(4, transaction.getPayer().getAccount());
				preparedStatement.setString(5, transaction.getPayee().getName());
				preparedStatement.setString(6, transaction.getPayee().getAccount());
				preparedStatement.setDouble(7, transaction.getAmount());
				preparedStatement.addBatch();
			}
			int result[] = preparedStatement.executeBatch();
			connection.commit(); 
			connection.close();
		} catch (SQLException e) 
		{
			e.printStackTrace();
		}

		return isSaved;
	}
}
