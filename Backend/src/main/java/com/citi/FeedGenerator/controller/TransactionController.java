package com.citi.FeedGenerator.controller;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.citi.FeedGenerator.dto.Transaction;
import com.citi.FeedGenerator.service.TransactionService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TransactionController {
	
	@Autowired
	TransactionService transactionService ; 

	ArrayList<ArrayList<Transaction>> validatedTransactions = new ArrayList<ArrayList<Transaction>>();
	
	@PostMapping("/upload")
	public ResponseEntity<?> handleFileUpload( @RequestParam("file") MultipartFile file) {
		
		String fileName = file.getOriginalFilename();
		
		try 
		{
			Path path = Paths.get("src\\main\\resources\\uploadedFiles\\"+fileName).toAbsolutePath();
			file.transferTo(path.toFile());
			
			validatedTransactions = transactionService.readFile(fileName);
			
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok("File uploaded");
	}
	
	@GetMapping("/GetValidTransactions")
	public ArrayList<Transaction> getValidTransactions()
	{
		if(validatedTransactions.isEmpty())
		{
			validatedTransactions.add(new ArrayList<Transaction>());
			validatedTransactions.add(new ArrayList<Transaction>());
		}
			
		return validatedTransactions.get(0);
	}
	
	@GetMapping("/GetInvalidTransactions")
	public ArrayList<Transaction> getInvalidTransactions()
	{
		if(validatedTransactions.isEmpty())
		{
			validatedTransactions.add(new ArrayList<Transaction>());
			validatedTransactions.add(new ArrayList<Transaction>());
		}
			
		return validatedTransactions.get(1);
	}
	
	@GetMapping("/GetTransactionCountPerReason")
	public ArrayList<Integer> getTransactionCountPerReason()
	{
		ArrayList<Integer> transactionCount = new ArrayList<Integer>();
		for(int i=0;i<9;i++)
		{
			transactionCount.add(0);
		}
		int noOfValidTransactions = validatedTransactions.isEmpty() ? 0 : validatedTransactions.get(0).size();
		int noOfInvalidTransactions = validatedTransactions.isEmpty() ? 1 : validatedTransactions.get(1).size();
		
		for(int i=0;i<validatedTransactions.get(1).size();i++)
		{
			if(validatedTransactions.get(1).get(i).getReason().equals("Invalid Reference Number"))
				transactionCount.set(0, transactionCount.get(0)+1);
			else if(validatedTransactions.get(1).get(i).getReason().equals("Invalid Transaction Date"))
				transactionCount.set(1, transactionCount.get(1)+1);
			else if(validatedTransactions.get(1).get(i).getReason().equals("Invalid Payer Name"))
				transactionCount.set(2, transactionCount.get(2)+1);
			else if(validatedTransactions.get(1).get(i).getReason().equals("Invalid Payer Account"))
				transactionCount.set(3, transactionCount.get(3)+1);
			else if(validatedTransactions.get(1).get(i).getReason().equals("Invalid Payee Name"))
				transactionCount.set(4, transactionCount.get(4)+1);
			else if(validatedTransactions.get(1).get(i).getReason().equals("Invalid Payee Account"))
				transactionCount.set(5, transactionCount.get(5)+1);
			else 
				transactionCount.set(6, transactionCount.get(6)+1);
		}
		
		
		transactionCount.set(7, noOfValidTransactions);
		transactionCount.set(8, noOfInvalidTransactions);
		
		return transactionCount;
	}
	
}
