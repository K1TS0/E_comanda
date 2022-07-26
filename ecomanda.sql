-- -----------------------------------------------------
-- Table `e-comanda`.`EMPRESA`
-- -----------------------------------------------------
CREATE TABLE `EMPRESA` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `NOME` VARCHAR(45) NOT NULL,
  `LOGIN` VARCHAR(16) NOT NULL,
  `SENHA` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`ID`)
  );


-- -----------------------------------------------------
-- Table `e-comanda`.`CLIENTE`
-- -----------------------------------------------------
CREATE TABLE `CLIENTE` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `NOME` VARCHAR(100) NOT NULL,
  `TELEFONE` VARCHAR(20) NULL,
  `EMPRESA_ID` INT NOT NULL,
  PRIMARY KEY (`ID`)
  );


-- -----------------------------------------------------
-- Table `e-comanda`.`PRODUTOS`
-- -----------------------------------------------------
CREATE TABLE `PRODUTOS` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `NOME` VARCHAR(45) NOT NULL,
  `VALOR` DOUBLE NOT NULL,
  `EMPRESA_ID` INT NOT NULL,
  PRIMARY KEY (`ID`)
  );


-- -----------------------------------------------------
-- Table `e-comanda`.`PEDIDOS`
-- -----------------------------------------------------
CREATE TABLE `PEDIDOS` (
  `CLIENTE_ID` INT NOT NULL,
  `PRODUTOS_ID` INT NOT NULL,
  `QTDE` INT NOT NULL,
  `DATA` DATETIME NOT NULL,
  PRIMARY KEY (`CLIENTE_ID`, `PRODUTOS_ID`)
  );


-- -----------------------------------------------------
-- Table `e-comanda`.`VENDA`
-- -----------------------------------------------------
CREATE TABLE `VENDA` (
  `ID` INT NOT NULL,
  `DATA` DATETIME NOT NULL,
  `FPAGAMENTO` INT NOT NULL COMMENT '1 - DINHEIRO\n2 - PIX\n3 - CARTÃO DE DÉBITO\n4 - CARTÃO DE CRÉDITO',
  `VALORRECEBER` DOUBLE NOT NULL,
  `TROCO` DOUBLE NULL,
  `VALORPAGO` DOUBLE NULL,
  `DESCONTO` DOUBLE NULL,
  `VALORRECEBIDO` DOUBLE NOT NULL,
  `CLIENTE_ID` INT NOT NULL,
  PRIMARY KEY (`ID`)
  );


-- -----------------------------------------------------
-- Table `e-comanda`.`CAIXA`
-- -----------------------------------------------------
CREATE TABLE `CAIXA` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `DATA` DATETIME NOT NULL,
  `VALOR` DOUBLE NOT NULL,
  `DESCRICAO` VARCHAR(45) NOT NULL,
  `LANCAMENTO` INT NOT NULL COMMENT '1 - ENTRADA\n2 - SAÍDA',
  `EMPRESA_ID` INT NOT NULL,
  PRIMARY KEY (`ID`)
  );