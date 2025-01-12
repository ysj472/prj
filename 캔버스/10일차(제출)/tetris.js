        //마이테트리스
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");

        document.addEventListener("keydown",keyDown, false);
        document.addEventListener("keyup",keyUp, false);
        //키보드 변수
        let leftDirection = false;
        let rightDirection = false;
        let downDirection = false;
        let turnDirection = false;

        //블록의 길이
        const length = 50;

        //캔버스를 행과 열로 분배
        const rows = 12;
        const cols = 10;

        //점수
        let score = 0;

        //블록의 최초 좌표
        let x = Math.floor(cols / 2)*length - length;
        let y = 0;

        //시작 종료 제어
        let gameLoop;

        //grid라는 격자 배열 선언
        let grid = [];
        for(let i=0;i<rows;i++){
            let row = [];
            for(let j=0;j<cols;j++){
                row.push(0);
            }
            grid.push(row);
        };

        //블록을 생성할 2차원 배열
        const blocks = [
            //T
            [ 
                {bx:-1, by:0},
                {bx:0, by:0},
                {bx:1, by:0},
                {bx:2, by:0}
            ],
            //정사각형
            [ 
                {bx:1, by:0},
                {bx:0, by:0},
                {bx:0, by:1},
                {bx:1, by:1}
            ],
            [ 
                /*
                  **
                **  
                */
                {bx:0, by:0},
                {bx:0, by:1},
                {bx:1, by:0},
                {bx:-1, by:1}
            ],
            [ 
            /*
                    **
                    *
                    * 
            */
                {bx:0, by:0},
                {bx:1, by:0},
                {bx:0, by:1},
                {bx:0, by:2}
            ],
            [
                {bx:0,by:0},
                {bx:0,by:1},
                {bx:0,by:2},
                {bx:0,by:3}
            ],
            [
                {bx:0,by:0},
                {bx:-1,by:0},
                {bx:0,by:1},
                {bx:1,by:1}
            ],
        ];
        // let block = [
        //     {bx:0, by:0},
        //     {bx:0, by:1},
        //     {bx:0, by:2},
        //     {bx:0, by:3},
        // ];

        //색상
        const color = [
            "red",
            "blue",
            "green",
            "yellow",
            "purple",
            "orange"
        ];

        //현재 블록
        let oneBlock;
        //현재 블록 색상
        let oneBlockColor;

        //다음 블록
        const nextBlock = Math.floor(Math.random() * blocks.length);      

        //랜덤 색상 배열
        let gridColor = [];
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < cols; j++) {
                row.push(0);
            }
            gridColor.push(row);
        }

        //미리보기 블록
        let twoBlock = blocks[nextBlock]; // 다음 블록이 미리보기 화면에 출력
        let twoBlockColor = color[nextBlock]; // 다음 블록의 색상

        //랜덤 블록 생성
        function madeBlock() {
            oneBlock = twoBlock;
            oneBlockColor = twoBlockColor;

            const made = Math.floor(Math.random() * blocks.length);
            twoBlock = blocks[made];
            twoBlockColor = color[made];
          };
        
          

        //블록의 좌표 변경 시, 캔버스 업데이트
        function updateCanvas() {
            ctx.clearRect(0,0,canvas.width,canvas.height);

            //고정된 블록에 대한 처리
            for(let r=0; r<rows; r++){
                for(let c=0; c<cols; c++){
                    if(grid[r][c]==1){
                        ctx.fillStyle=gridColor[r][c];
                        ctx.fillRect(c*length, r*length, length, length);
                        ctx.strokeStyle="black";
                        ctx.strokeRect(c*length, r*length, length, length);
                    }
                }
            };

            // 스코어박스
            ctx.strokeRect(320, 10, 160, 60);
            ctx.font = "20px Arial";
            ctx.fillStyle = "black";
            ctx.fillText("Score : " + score, 350, 50);

            //낙하중인 블록 생성
            for(let i=0; i<oneBlock.length;i++){
                const{bx, by} = oneBlock[i];
                let dx = x + bx*length;
                let dy = y + by*length;
                ctx.fillStyle = oneBlockColor;
                ctx.fillRect(dx, dy, length, length);
                ctx.strokeStyle = "black";
                ctx.strokeRect(dx, dy, length, length);
            };

            //미리보기 블록 박스
                ctx.strokeStyle = "black";
                ctx.strokeRect(10,10,130,100);

                //미리보기 블록
                    for(let i=0;i<twoBlock.length;i++){
                        const {bx,by} = twoBlock[i];
                        let dx = 40 + bx*20;
                        let dy = 25 + by*20;
                        ctx.fillStyle = twoBlockColor;
                        ctx.fillRect(dx,dy,20,20);
                        ctx.strokeStyle="black";
                        ctx.strokeRect(dx,dy,20,20);
                    }
          };

          //충돌 감지 로직
          function checkCollision(oneBlock,x,y) {
            for(let i=0;i<oneBlock.length;i++){
                const{bx,by} = oneBlock[i];
                let newX = Math.floor((x+bx*length)/length);
                let newY = Math.floor((y+by*length)/length);

                if(
                    newX<0 ||
                    newX>=cols ||
                    newY <0 ||
                    newY>=rows ||
                    newY>=0 && grid[newY][newX]===1
                ){
                    return true;
                }
            }
            return false;
            };

            //블록 고정
            function fixBlock() {
                for(let i=0;i<oneBlock.length;i++){
                    const {bx,by} = oneBlock[i];
                    let gridX = Math.floor((x+bx*length)/length);
                    let gridY = Math.floor((y+by*length)/length);

                    grid[gridY][gridX] = 1;
                    gridColor[gridY][gridX] = oneBlockColor;
                };
              }

              //줄삭제
              function deleteRows() {
                for(let r=rows-1;r>=0;r--){
                    let full = true;
                    for(let c=0;c<cols;c++){
                        if(grid[r][c]!==1){
                            full = false;
                            break;
                        }
                    }
                    if(full){
                        grid.splice(r,1);
                        grid.unshift(new Array(cols).fill(0));
                        score += 1000;
                        r++;
                    }
                }
                };

                //게임 다시시작
                function resetGame() {
                    x = Math.floor(cols / 2)*length - length;
                    y = 0;
                    score = 0;

                    grid = [];
                    for (let i = 0; i < rows; i++) {
                        let row = [];
                        for (let j = 0; j < cols; j++) {
                            row.push(0);
                        }
                        grid.push(row);
                    }
                    updateCanvas();
                };

                //왼쪽
                function left() {
                    if(!checkCollision(oneBlock,x-length,y)){
                        x-=length;
                    }
                    updateCanvas();
                  };

                  //오른쪽
                function right() {
                    if(!checkCollision(oneBlock,x+length,y)){
                        x+=length;
                    }
                    updateCanvas();
                  }

                //자동 하강
                function down() {
                    if(!checkCollision(oneBlock,x,y+length)){
                        y+=length;
                    }else{
                        fixBlock(x,y);
                        deleteRows();
                        madeBlock();
                        x = Math.floor(cols / 2) * length - length;
                        y = 0;
                    
                        if(checkCollision(oneBlock,x,y)){
                            alert("게임 종료!");
                            clearInterval(gameLoop);
                            resetGame();
                            return;
                        }
                    }
                    updateCanvas();
                  };

                  //아래키 누르면 바로 낙하
                  function falling() {
                    while (!checkCollision(oneBlock, x, y + length)) {
                        y += length; // 한 칸씩 아래로 이동
                    }
                    fixBlock(x, y); // 바닥에 고정
                    deleteRows(); // 한 줄 삭제 체크
                    madeBlock(); // 새로운 블록 생성
                    x = Math.floor(cols / 2) * length - length;
                    y = 0;

                    if (checkCollision(oneBlock, x, y)) {
                        alert("게임 종료!");
                        clearInterval(gameLoop);
                        resetGame();
                        return;
                    }
                }

                //회전함수
                function turn() {
                    let rotated = [];
                    for(let i=0;i<oneBlock.length;i++){
                        let {bx, by} = oneBlock[i];
                        rotated.push({bx:-by, by:bx});
                    }
                    if(!checkCollision(rotated,x,y)){
                        oneBlock = rotated;
                    }
                    updateCanvas();
                };

                madeBlock();
            updateCanvas();
            setInterval(down,1000);

            //키보드 방향키 클릭
            function keyDown(e) {
                if(e.key == 39 || e.key == "ArrowLeft"){
                    leftDirection = true;
                }else if(e.key == 37 || e.key == "ArrowRight"){
                    rightDirection = true;
                }else if(e.key == 38 || e.key == "ArrowUp"){
                    turnDirection = true;
                }else if(e.key == 40 | e.key == "ArrowDown"){
                    downDirection = true;
                }
                move();
              }

              // 키보드에서 아웃
            function keyUp(e) {
                if (e.key == "ArrowLeft" || e.key == 37) {
                    leftDirection = false;
                } else if (e.key == "ArrowRight" || e.key == 39) {
                    rightDirection = false;
                } else if (e.key == "ArrowDown" || e.key == 40) {
                    downDirection = false;
                } else if (e.key == "ArrowUp" || e.key == 38) {
                    turnDirection = false;
                }
            }

        // 키보드 방향키 호출 함수
        function move() {
            if (leftDirection) {
                left();
            } else if (rightDirection) {
                right();
            } else if (downDirection) {
                falling();
            } else if (turnDirection) {
                turn();
            }
            updateCanvas();
        }