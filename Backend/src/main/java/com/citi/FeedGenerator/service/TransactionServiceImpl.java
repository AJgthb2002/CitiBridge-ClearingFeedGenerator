package com.citi.FeedGenerator.service;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citi.FeedGenerator.dto.Transaction;
import com.citi.FeedGenerator.repository.TransactionRepository;

@Service
public class TransactionServiceImpl implements TransactionService {

	@Autowired
	private TransactionRepository transactionRepository;
	
	@Autowired
	DataSource dataSource;
	
	@Override
	public ArrayList<ArrayList<Transaction>> readFile(String file) {
		
		return transactionRepository.readFile(file);
	}

	@Override
	public boolean isValid(Transaction transaction) {
		
		boolean flag = false;
		try {
			Connection connection = dataSource.getConnection();
			String uniqueTransaction = "select * from transactions where refNo = ?";
			PreparedStatement preparedStatement = connection.prepareStatement(uniqueTransaction);   
			preparedStatement.setString(1, "123456789012");
			ResultSet resultSet = preparedStatement.executeQuery();
			
			if(resultSet.next())
			{
				flag = true;
				System.out.println(resultSet.getDate(2));
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return flag;
	}

	@Override
	public ArrayList<ArrayList<Transaction>> validate(ArrayList<Transaction> allTransactions) throws IOException{
	
		return transactionRepository.validate(allTransactions);
	}

	@Override
	public void writeValidFile(ArrayList<Transaction> validTransactions) throws IOException{
		
		transactionRepository.writeValidFile(validTransactions);
	}

	@Override
	public boolean saveValidTransactions(ArrayList<Transaction> validTransactions) throws IOException{
		
		return transactionRepository.saveValidTransactions(validTransactions);
	}

}
