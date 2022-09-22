package com.citi.FeedGenerator.dto;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class AllTransactionFile {

	String name;
	private ArrayList<Transaction> transactions =  new ArrayList<Transaction>();
	
}
