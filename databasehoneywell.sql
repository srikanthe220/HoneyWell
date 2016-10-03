create database honeywell;
use honeywell;

CREATE TABLE Employee (
  emp_id int(11) NOT NULL,
  First_name VARCHAR(20) NOT NULL,
  Last_name VARCHAR(20) NOT NULL,
  Mac_Addr VARCHAR(50) NOT NULL,
  Email VARCHAR(50) NOT NULL,
  PRIMARY KEY(Mac_Addr)
);
CREATE TABLE RouterIp(
	rou_id int(5),
	Router_Id VARCHAR(20) NOT NULL,
	Floor int(4) NOT NULL,
	Pillar int(5) NOT NULL,
	post VARCHAR(20),
	PRIMARY KEY(Router_Id)
);

CREATE TABLE Dynamic_Routing(
    Mac_Addr VARCHAR(50) NOT NULL,
    Router_Id VARCHAR(20) NOT NULL,
    FOREIGN KEY (Router_Id) REFERENCES RouterIp(Router_Id) ON DELETE CASCADE,
    FOREIGN KEY (Mac_Addr) REFERENCES Employee(Mac_Addr) ON DELETE CASCADE,
    PRIMARY KEY (Mac_Addr,Router_Id)
);


Query 1:
SELECT e.First_name,e.Last_name,r.Floor,r.Pillar,r.post
FROM Employee e,Dyanamic_Routing d,Router_Id r 
WHERE (e.First_name LIKE '%e%' AND e.Mac_Addr=d.Mac_Addr AND d.Router_Id=r.Router_Id)
 
VARIABLES: e

Query 2:
SELECT Mac_Addr 
FROM Dynamic_Routing
WHERE Mac_Addr="SOME Mac_Addr"

VARIABLES: SOME Mac_Addr

Query 3:
INSERT INTO Dynamic_Routing
VALUES (Mac_Addr,Router_Id);

VARIABLES: Mac_Addr,Router_Id

Query 4:
UPDATE Dynamic_Routing
SET Router_Id="PRESENT Router_Id"
WHERE Router_Id="TO BE UPDATED"

VARIABLES: PRESENT Router_Id, TO BE UPDATED