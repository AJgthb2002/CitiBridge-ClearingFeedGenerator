package com.citi.FeedGenerator.controller;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
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

import com.citi.FeedGenerator.dto.AllTransactionFile;
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
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ResponseEntity.ok("File uploaded");
	}
	
	@GetMapping("/GetValidTransactions")
	public ArrayList<Transaction> getValidTransactions()
	{
		return validatedTransactions.isEmpty() ? null : validatedTransactions.get(0);
	}
	
	@GetMapping("/GetInvalidTransactions")
	public ArrayList<Transaction> getInvalidTransactions()
	{
		return validatedTransactions.isEmpty() ? null : validatedTransactions.get(1);
	}
	
}
