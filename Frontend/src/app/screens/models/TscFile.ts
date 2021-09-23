import { Component, OnInit } from '@angular/core';
import { Parameter } from './Parameter';
import { GeneratedTestReport } from "./GeneratedTestReport";
import { User } from './User';


export class TscFile{
public id: number;
public generationDate: Date;
public paramValues: string;
public status:boolean;
public tuple: string;
public gTR :GeneratedTestReport;
public prodName: string;
public relName: string;
public user : User;
public testCycle : string;

}


