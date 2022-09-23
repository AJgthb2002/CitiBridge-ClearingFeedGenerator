package com.citi.FeedGenerator.dto;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // lombok lib is not used for the project 
@AllArgsConstructor //will accept all arg in a constructor
@NoArgsConstructor 
@Component
public class Person {

	private String name;
	private String account;
}
