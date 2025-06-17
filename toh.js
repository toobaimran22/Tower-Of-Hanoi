$(function () {
  let moveCount = 0;

  function generateDisks(n) {
    $(".disk").remove(); 
    for (let i = n; i >= 1; i--) {
      const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      $("<div>")
        .addClass("disk")
        .attr("id", "disk" + i)
        .text(i)
        .css({
          width: 40 + i * 15 + "px",
          backgroundColor: randomColor
        })
        .appendTo($("#tower1"));
    }
  }

  function makeDraggable() {
  $(".tower").each(function () {
    $(this).children(".disk").last().draggable({
      revert: "invalid",
      containment: ".container",
      zIndex: 1000
    });
  });
}


  function setupDroppables() {
    $(".tower").droppable({
      accept: function (dragged) {
        const $topDisk = $(this).children(".disk").last();
        return $topDisk.length === 0 || $(dragged).width() < $topDisk.width();
      },
      drop: function (event, ui) {
        const $dragged = ui.draggable;
        $dragged.detach().appendTo($(this)).css({ top: "", left: "" });
        moveCount++;
        $("#moveCounter").text("Moves: " + moveCount);
        makeDraggable();
        checkWin();
      }
    });
  }

  function checkWin() {
    if ([$("#tower2 .disk").length, $("#tower3 .disk").length].includes(+$("#diskCount").val())) {
      setTimeout(() => {
        alert(`Congratulations! You solved the Tower of Hanoi in ${moveCount} moves!`);
      }, 200);
    }
  }


  function resetGame() {
    moveCount = 0;
    $("#moveCounter").text("Moves: " + moveCount);
    const diskCount = +$("#diskCount").val();
    generateDisks(diskCount);
    makeDraggable();
  }

  $("#resetBtn").click(resetGame);
  $("#diskCount").change(resetGame);

  resetGame();
  setupDroppables();
});
