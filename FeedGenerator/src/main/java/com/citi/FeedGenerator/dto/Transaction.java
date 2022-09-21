package com.citi.FeedGenerator.dto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // lombok lib is not used for the project 
@AllArgsConstructor //will accept all arg in a constructor
@NoArgsConstructor //w
public class Transaction {
	private String refNo ;
	private String date;
	private Person payer;
	private Person payee;
	private double amount;
	private String reason;
}
