provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "example" {
  cidr_block       = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = {
    Name = "example"
  }
}

resource "aws_subnet" "example" {
  vpc_id     = "${aws_vpc.example.id}"
  cidr_block = "10.0.1.0/24"
  availability_zone = "us-east-1a"
  tags = {
    Name = "example"
  }
}

resource "aws_subnet" "example_2" {
  vpc_id     = "${aws_vpc.example.id}"
  cidr_block = "10.0.2.0/24"
  availability_zone = "us-east-1b"
  tags = {
    Name = "example_2"
  }
}

resource "aws_internet_gateway" "example" {
  vpc_id = "${aws_vpc.example.id}"

  tags = {
    Name = "example"
  }
}

resource "aws_route_table" "example" {
  vpc_id = "${aws_vpc.example.id}"
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.example.id}"
  }

  tags = {
    Name = "example"
  }
}

resource "aws_route_table_association" "a" {
  subnet_id      = "${aws_subnet.example.id}"
  route_table_id = "${aws_route_table.example.id}"
}

resource "aws_security_group" "db" {
  name        = "db"
  description = "Allow inbound traffic for database"
  vpc_id      = "${aws_vpc.example.id}"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "db"
  }
}

# database
resource "aws_db_instance" "example" { 
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "14"
  instance_class       = "db.t3.micro"
  db_name              = "mydb"
  username             = "myuser"
  password             = "mypassword"
  parameter_group_name = "default.postgres14"
  skip_final_snapshot  = true
  vpc_security_group_ids = ["${aws_security_group.db.id}"]
  db_subnet_group_name    = "${aws_db_subnet_group.example.name}"

  tags = {
    Name = "example"
  }
}

resource "aws_db_subnet_group" "example" {
  name       = "example"
  subnet_ids = ["${aws_subnet.example.id}", "${aws_subnet.example_2.id}"]

  tags = {
    Name = "example"
  }
}

resource "aws_security_group" "ec2_sg" {
  name        = "ec2_sg"
  description = "Allow incoming traffic to EC2"
  vpc_id      = "${aws_vpc.example.id}"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ec2_sg"
  }
}

# EC2
resource "aws_instance" "example" { 
  ami           = "ami-04b70fa74e45c3917" # Put the Ubuntu AMI identifier for the us-east-1 region here.
  instance_type = "t2.micro"
  key_name      = "example"
  vpc_security_group_ids = ["${aws_security_group.ec2_sg.id}", "${aws_security_group.db.id}"]
  subnet_id      = "${aws_subnet.example.id}"

  tags = {
    Name = "example"
  }
}

resource "aws_eip" "example" {
  instance = aws_instance.example.id
  tags = {
    Name = "example"
  }
}

output "instance_ip" {
  value = aws_eip.example.public_ip
}