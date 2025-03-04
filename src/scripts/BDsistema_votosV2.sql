-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.39 - MySQL Community Server - GPL
-- SO del servidor:              Linux
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla sistema_votaciones.candidate
CREATE TABLE IF NOT EXISTS `candidate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `party` varchar(50) DEFAULT NULL,
  `votes` bigint NOT NULL DEFAULT '0',
  `available` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla sistema_votaciones.candidate: ~0 rows (aproximadamente)
REPLACE INTO `candidate` (`id`, `name`, `email`, `party`, `votes`, `available`) VALUES
	(1, 'Juan Pérez', 'juan.perez@azul.com', 'Partido Azul', 0, 1),
	(2, 'María Gómez', 'maria.gomez@rojo.com', 'Partido Rojo', 0, 1),
	(3, 'Carlos López', 'carolos.lopez@verde.com', 'Partido Verde', 0, 1);

-- Volcando estructura para procedimiento sistema_votaciones.updateVoter
DELIMITER //
CREATE PROCEDURE `updateVoter`(IN voterId INT)
BEGIN
    UPDATE voter 
    SET HAS_VOTED = 0 
    WHERE ID = voterId;
END//
DELIMITER ;

-- Volcando estructura para procedimiento sistema_votaciones.updateVotes
DELIMITER //
CREATE PROCEDURE `updateVotes`(IN candidateId INT)
BEGIN
    UPDATE candidate 
    SET votes = (SELECT COUNT(*) FROM vote WHERE candidate_id = candidateId)
    WHERE id = candidateId;
END//
DELIMITER ;

-- Volcando estructura para tabla sistema_votaciones.vote
CREATE TABLE IF NOT EXISTS `vote` (
  `id` int NOT NULL AUTO_INCREMENT,
  `voter_id` int NOT NULL,
  `candidate_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `voter_id` (`voter_id`),
  KEY `FK_vote_candidate` (`candidate_id`),
  CONSTRAINT `FK_vote_candidate` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`),
  CONSTRAINT `FK_vote_voter` FOREIGN KEY (`voter_id`) REFERENCES `voter` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla sistema_votaciones.vote: ~0 rows (aproximadamente)
-- REPLACE INTO `vote` (`id`, `voter_id`, `candidate_id`) VALUES
-- 	(1, 3, 2),
-- 	(2, 4, 2),
-- 	(2, 5, 2),
-- 	(3, 6, 8);

-- Volcando estructura para tabla sistema_votaciones.voter
CREATE TABLE IF NOT EXISTS `voter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `has_voted` tinyint NOT NULL DEFAULT (0),
  `available` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla sistema_votaciones.voter: ~0 rows (aproximadamente)
REPLACE INTO `voter` (`id`, `name`, `email`, `has_voted`, `available`) VALUES
	(1, 'Ana Torres', 'ana.torres@example.com', 0, 1),
	(2, 'Luis Martínez', 'luis.martinez@example.com', 0, 1),
	(3, 'Sofía Ramírez', 'sofia.ramirez@example.com', 0, 1),
	(4, 'Diego Fernández', 'diego.fernandez@example.com', 0, 1),
	(5, 'Elena Gutiérrez', 'elena.gutierrez@example.com', 0, 1);

-- Volcando estructura para vista sistema_votaciones.voting_statistics
-- Creando tabla temporal para superar errores de dependencia de VIEW
CREATE TABLE `voting_statistics` (
	`candidate_id` INT NOT NULL,
	`candidate_name` VARCHAR(1) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`total_votes` BIGINT NOT NULL,
	`vote_percentage` DECIMAL(27,4) NULL
) ENGINE=MyISAM;

-- Volcando estructura para disparador sistema_votaciones.after_delete_update_candidate_votes
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `after_delete_update_candidate_votes` AFTER DELETE ON `vote` FOR EACH ROW BEGIN
    CALL updateVotes(OLD.candidate_id);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador sistema_votaciones.after_voter_update_delete_vote
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `after_voter_update_delete_vote` AFTER UPDATE ON `voter` FOR EACH ROW BEGIN
    -- Al ejecutar borrado lógico de un votante, elimnar este voto de la tabla vote
    IF OLD.available = 1 AND NEW.available = 0 THEN
    
        DELETE FROM vote WHERE voter_id = OLD.id;
      
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador sistema_votaciones.after_vote_insert_update_voter
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `after_vote_insert_update_voter` AFTER INSERT ON `vote` FOR EACH ROW BEGIN
    UPDATE voter 
    SET HAS_VOTED = 1 
    WHERE ID = NEW.VOTER_ID;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador sistema_votaciones.after_vote_insert_update_votes
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `after_vote_insert_update_votes` AFTER INSERT ON `vote` FOR EACH ROW BEGIN
   CALL updateVotes(NEW.candidate_id);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Volcando estructura para disparador sistema_votaciones.before_candidate_deactivation
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `before_candidate_deactivation` AFTER UPDATE ON `candidate` FOR EACH ROW BEGIN
    -- Verificar si el candidato está siendo desactivado
    IF OLD.available = 1 AND NEW.available = 0 THEN
        -- Eliminar los votos asociados a este candidato
        DELETE FROM vote WHERE candidate_id = OLD.id;

        -- Actualizar has_voted a false en los votantes que votaron por este candidato
        UPDATE voter 
        SET has_voted = 0 
        WHERE id IN (SELECT DISTINCT voter_id FROM vote WHERE candidate_id = OLD.id);
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Eliminando tabla temporal y crear estructura final de VIEW
DROP TABLE IF EXISTS `voting_statistics`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `voting_statistics` AS select `c`.`id` AS `candidate_id`,`c`.`name` AS `candidate_name`,count(`v`.`id`) AS `total_votes`,((count(`v`.`id`) / nullif((select count(0) from `voter` where (`voter`.`has_voted` = 1)),0)) * 100) AS `vote_percentage` from (`candidate` `c` left join `vote` `v` on((`c`.`id` = `v`.`candidate_id`))) where (`c`.`available` = 1) group by `c`.`id`,`c`.`name`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
