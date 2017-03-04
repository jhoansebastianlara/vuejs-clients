create database if not exists DB_CLIENTS;

use DB_CLIENTS;

create table if not exists client (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  phone varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists provider (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table if not exists client_provider (
  client_id int(11) NOT NULL,
  provider_id int(11) NOT NULL,
  PRIMARY KEY (client_id, provider_id),
  CONSTRAINT client_provider_client_FK FOREIGN KEY (client_id) REFERENCES client (id) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT client_provider_provider_FK FOREIGN KEY (provider_id) REFERENCES provider (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
