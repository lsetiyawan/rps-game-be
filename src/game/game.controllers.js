const { Game, GameHistory } = require("../database/models");
class GameController {
  getAllGame = async (req, res) => {
    try {
      const allRoom = await Game.findAll();
      return res.status(200).json(allRoom);
    } catch (err) {
      return res.status(500).json({ message: "Get all game room failed!" });
    }
  };

  getSingleGame = async (req, res) => {
    const { gameId } = req.params;
    try {
      const theGame = await Game.findByPk(gameId);
      return res.status(200).json(theGame);
    } catch (err) {
      return res.status(500).json({ message: "Get single game room failed!" });
    }
  };

  createGame = async (req, res) => {
    const { room } = req.body;
    try {
      const savedRoom = await Game.create({ room });
      return res.status(201).json(savedRoom);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Create game room failed!" });
    }
  };

  fight = async (req, res) => {
    const { roomId, choice } = req.params;
    const { id } = req.auth;
    try {
      const gameRoom = await Game.findByPk(roomId, { raw: true });
      if (!gameRoom) {
        return res.status(400).json({ message: "Game room is not exist" });
      }
      if (gameRoom.end) {
        return res.status(400).json({ message: "Game is over!" });
      }
      const gameHistory = await GameHistory.findOne({
        where: {
          game_id: roomId,
          player_id: id,
        },
      });
      if (gameHistory) {
        return res
          .status(400)
          .json({ message: "You've submitted your choice!" });
      }

      await GameHistory.create({
        game_id: roomId,
        player_id: id,
        choice,
      });

      // calculating result
      const result = await this._calculateResult(roomId);

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Error when fight!" });
    }
  };

  _calculateResult = async (gameId) => {
    const gameHistory = await GameHistory.findAll(
      {
        where: { game_id: gameId },
      },
      { raw: true }
    );

    if (gameHistory.length == 2) {
      const choices = gameHistory[0].choice + gameHistory[1].choice;
      switch (choices) {
        case "PR":
        case "RS":
        case "SP":
          await Game.update(
            { winner: gameHistory[0].player_id, end: true },
            { where: { id: gameId } }
          );
          break;

        case "RP":
        case "SR":
        case "PS":
          await Game.update(
            { winner: gameHistory[1].player_id, end: true },
            { where: { id: gameId } }
          );
          break;

        default:
          await Game.update({ end: true }, { where: { id: gameId } });
          break;
      }
    }

    let result = await Game.findByPk(gameId, { raw: true });
    return result;
  };
}

module.exports = new GameController();
