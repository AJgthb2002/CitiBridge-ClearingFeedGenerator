package com.citi.FeedGenerator.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // lombok lib is not used for the project 
@AllArgsConstructor //will accept all arg in a constructor
@NoArgsConstructor 

public class Person {

	private String name;
	private String account;
}
