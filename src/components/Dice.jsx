const Dice = ({ id, clickedDice, isClicked, number }) => {
  return (
    <div
      className="dice"
      onClick={() => {
        clickedDice(id, number);
      }}
      style={isClicked ? { backgroundColor: "#59e391" } : {}}
    >
      {number}
    </div>
  );
};

export default Dice;
