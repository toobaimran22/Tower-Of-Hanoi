$(function () {
  let moveCount = 0;

  const diskColors = [
    "#e74c3c", "#d35400", "#f39c12", "#27ae60",
    "#2980b9", "#8e44ad", "#2c3e50", "#7f8c8d"
  ];

  function generateDisks(n) {
    const $tower1 = $("#tower1");
    $(".disk").remove(); 
    for (let i = n; i >= 1; i--) {
      const $disk = $("<div>")
        .addClass("disk")
        .attr("id", "disk" + i)
        .text(i)
        .css({
          width: 40 + i * 15 + "px",
          backgroundColor: diskColors[i - 1]
        });
      $tower1.append($disk);
    }
  }

  function makeDraggable() {
    $(".tower").each(function () {
      const $topDisk = $(this).children(".disk").last();
      if ($topDisk.length > 0) {
        $topDisk.draggable({
          revert: "invalid",
          containment: ".container",
          zIndex: 1000
        });
      }
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
    const totalDisks = parseInt($("#diskCount").val());
    const tower2Disks = $("#tower2").children(".disk").length;
    const tower3Disks = $("#tower3").children(".disk").length;

    if (tower2Disks === totalDisks || tower3Disks === totalDisks) {
      setTimeout(() => {
        alert("Congratulations! You solved the Tower of Hanoi in " + moveCount + " moves!");
      }, 200);
    }
  }

  function resetGame() {
    moveCount = 0;
    $("#moveCounter").text("Moves: " + moveCount);
    const diskCount = parseInt($("#diskCount").val());
    generateDisks(diskCount);
    makeDraggable();
  }

  $("#resetBtn").click(resetGame);

  $("#diskCount").change(resetGame);

  resetGame();
  setupDroppables();
});
