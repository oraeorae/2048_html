		var score = 0;
		//创建二维数组
		var map =new Array(4);
		for(var i=0;i<4;i++){
		　　map[i]=new Array(4);
		}
		//初始化
		for(var i = 0 ; i < 4 ; i++ ){
			for(var j = 0 ; j < 4 ; j++ ){
				map[i][j]= 0;
			}
		}
		
		var isnew = 0;              //是否需要创造
		
		function show() {
			document.getElementById("score").innerText = "分数:"+score;
			
		    for (var i = 0; i < 4; i++) {
		        for (var j = 0; j < 4; j++) {
					if( map[i][j] == 0 ){
						//改类名，让颜色变
						document.getElementById(String(i+1)+String(j+1)).className = "gezi0";
						//改内容
						document.getElementById(String(i+1)+String(j+1)).innerText = " ";
					}else{
						document.getElementById(String(i+1)+String(j+1)).className = "gezi"+String(map[i][j]);
					
						document.getElementById(String(i+1)+String(j+1)).innerText = String(map[i][j]);
					}
					
			      
		        }
		       
		    }
		
		}
		
		function judge() {
		    var isblack = 0;
		    for (var i = 0; i < 4; i++) {
		        for (var j = 0; j < 4; j++) {
		            if (map[i][j] == 2048) {            //出现2048
		                confirm("游戏胜利"); //在页面上弹出确认对话框
		            }
		            if (map[i][j] != 0) {
		                isblack++;
		            }
		        }
		    }   
		
		    //看是否还可以继续进行有效移动
		    var isfail = 1;
		    if (isblack == 16) {
		        //分析一列
		        for (var j = 0; j < 4 && isfail != 0;  j++) {           
		            var stk = new Array(4);						//用数组表示栈
		            var top = 0;		
		            for (var i = 0; i < 4 && isfail != 0; i++) {
		                if (top == 0 || stk[top - 1] != map[i][j]) {         //top != map[i][j]
		                    stk[top] = map[i][j];
							top++;
		                }
		                else {
		                    isfail = 0;             //说明还可以继续进行有效移动
		                    break;
		                }
		            }
		        }
		
		        //分析一行
		        for (var i = 0; i < 4 && isfail != 0; i++) {
		            var stk = new Array(4);						//用数组表示栈
		            var top = 0;		
		            for (var j = 0; j < 4 && isfail != 0; j++) {
		                if (top == 0 || stk[top - 1] != map[i][j]) {         //top != map[i][j]
		                    stk[top] = map[i][j];
							top++;
		                }
		                else {
		                    isfail = 0;
		                    break;
		                }
		            }
		        }
		        if (isfail == 1) {
					confirm("游戏失败"); //在页面上弹出确认对话框
		        }
		    }
		}
		
		function move(model) {               //移动
		    var isvalid = 0;
		    if (model == 1) {       //up
		        for (var j = 0; j < 4; j++) {       //对每一列进行分析
		            var stk = new Array(4);			//用数组表示栈
					for(var i = 0 ; i < 4 ; i++ ){
						stk[i] = 0;
					}
					
					var top = 0;					//top表示还没东西的位置（top = size）
		            for (var i = 0; i < 4; i++) {
		               
		                //将不是0的插入
		                if ( map[i][j] != 0) {       //利用栈来排列（栈原理）
							//top = size 
		                    if ( top  == 0 ||  stk[top-1] != map[i][j]) {         //top != map[i][j]
								stk[top] = map[i][j];
								top++;
		                    }
		                    else {
								score += map[i][j] * 2;
		                        stk[top-1] = map[i][j] * 2;
		                    }
		
		                   
		                }
		            }
		            if ( top != 4) {          //如果不等于4，说明是有效移动
		                //跟原来比较一下
		                for (var k = 0; k < top; k++) {
		                    if (map[k][j] != stk[k]) {
		                        isvalid = 1;
		                    }
		                }
		            }
					/*
		            for (var k = top; k < 4; k++)
		            {
		                stk[top] = 0;
						top++;
		            }*/
		
		            //将结果放入map中
		            for (var k = 0; k < 4; k++) {
		                map[k][j] = stk[k];
		            }
		        }
		    }else if( model == 2 ){         //down
		        for (var j = 0; j < 4; j++) {       //对每一列进行分析
		            var stk = new Array(4);
					for(var i = 0 ; i < 4 ; i++ ){
						stk[i] = 0;
					}
					var top = 0;
					
		            for (var i = 3; i >= 0 ; i--) {
		              
		                //将不是0的插入
		                if (map[i][j] != 0) {           //利用栈来排列
		                    if (top == 0 || stk[top - 1] != map[i][j]) {         //top != map[i][j]
		                        stk[top] = map[i][j];
								top++;
		                    }
		                    else {
								score += map[i][j] * 2;
		                        stk[top - 1] = map[i][j] * 2;
		                    }
		                }
		            }
		            if (top != 4) {          //如果不等于4，说明是有效移动
		                //跟原来比较一下
		                for (var k = 0; k < top; k++) {
		                    if (map[3 - k][j] != stk[k]) {
		                        isvalid = 1;
		                    }
		                }
		            }
					/*
		            for (var k = top; k < 4; k++)
		            {
		                stk[top-1] = 0;
						top++;
		            }
					*/
		            //将结果放入map中
		            for (var k = 0; k < 4; k++) {
		                map[3-k][j] = stk[k];
		            }
		        }
		    }
		    else if ( model == 3) {          //left
		        for (var i = 0; i < 4; i++) {           //对每一行进行分析
		            var stk = new Array(4);
					for(var k = 0 ; k < 4 ; k++ ){
						stk[k] = 0;
					}
					var top = 0 ;
		            for (var j = 0; j < 4; j++) {       
		                //将不是0的插入
		                if (map[i][j] != 0) {           //利用栈来排列
		                    if (top == 0 || stk[top - 1] != map[i][j]) {         //top != map[i][j]
		                        stk[top] = map[i][j];
								top++;
		                    }
		                    else {
								score += map[i][j] * 2;
		                        stk[top - 1] = map[i][j] * 2;
		                    }
		                }
		            }
		            if (top != 4) {          //如果不等于4，说明是有效移动
		                 //跟原来比较一下
		                for (var k = 0; k < top; k++) {
		                    if (map[i][k]  != stk[k]) {
		                        isvalid = 1;
		                    }
		                }
		      
		            }
					/*
		            for (var k = top; k < 4; k++)
		            {
		                stk[top-1] = 0;
						top++;
		            }*/
		
		            //将结果放入map中
		            for (var k = 0; k < 4; k++) {
		                map[i][k] = stk[k];
		            }
		        }
		    }
		    else if ( model == 4) {              //right
		        for (var i = 0; i < 4; i++) {           //对每一行进行分析
		            var stk = new Array(4);
					for(var k = 0 ; k < 4 ; k++ ){
						stk[k] = 0;
					}
					var top = 0;
		            for (var j = 3; j >= 0; j--) {       
		                 
		                //将不是0的插入
		                if (map[i][j] != 0) {           //利用栈来排列
		                    if (top == 0 || stk[top - 1] != map[i][j]) {         //top != map[i][j]
		                        stk[top] = map[i][j];
								top++;
		                    }
		                    else {
								score += map[i][j] * 2;
		                        stk[top - 1] = map[i][j] * 2;
								
		                    }
		                }
		            }
		            if (top != 4) {          //如果不等于4，说明是有效移动
		                 //跟原来比较一下
		                for (var k = 0; k < top; k++) {
		                    if (map[i][3 - k] != stk[k]) {
		                        isvalid = 1;
		                    }
		                }
		            }
					/*
		            for (var k = top; k < 4; k++)
		            {
		                stk[top-1] = 0;
						top++;
		            }*/
		
		            //将结果放入map中
		            for (var k = 0; k < 4; k++) {
		                map[i][3-k] = stk[k];
		            }
		
		        }
		    }
		    return isvalid;
		
		}
		
		function up() {
		    if (move(1)) {           //如果能进行有效移动，则创造新的数字
		        new_num();
		    }
		}
		
		function down() {
		    if (move(2)) {
		        new_num();
		    }
		}
		
		function left() {
		    if (move(3)) {
		        new_num();
		    }
		}
		
		function right() {
		    if (move(4)) {         
		        new_num();
		    }
		}
		
		function new_num() {
		    //开始时棋盘内随机出现两个数字，出现的数字仅可能为2或4。
		    //每有效移动一步，棋盘的空位(无数字处)随机出现一个数字(依然可能为2或4)。
		
		    var isok = 0;
		    while (isok != 1) {
				//Math.floor(Math.random()*(3-0+1)+0);
		        var pos_x = Math.floor(Math.random()*(3-0+1)+0);
		        var pos_y = Math.floor(Math.random()*(3-0+1)+0);
		        if (map[pos_x][pos_y] == 0 ) {
					if( Math.floor(Math.random()*(1-0+1)+0) == 0 ){
						 map[pos_x][pos_y] = 2;
					}else{
						map[pos_x][pos_y] = 4;
					}
		            isok = 1;
		        }
		    }
		    
		
		    return;
		}
		
		
		document.onkeydown=function(event){
		            var e = event || window.event || arguments.callee.caller.arguments[0];
		            if(e && e.keyCode==65){ // 按a
		                //要做的事情
						left();
						judge();            //判断游戏是否成功或者失败
						show();
		              }
		            if(e && e.keyCode==68){ // 按d
		                 //要做的事情
						 right();
						 judge();            //判断游戏是否成功或者失败
						 show();
		            }            
		            if(e && e.keyCode==87){ //w
		                 //要做的事情
						 up();
						 judge();            //判断游戏是否成功或者失败
						 show();
		            }
					if(e && e.keyCode==83){ //s
					     //要做的事情
						 down();
						 judge();            //判断游戏是否成功或者失败
						 show();
					}
					
		        }; 
		
		
		function main() {
			for(var i = 0 ; i < 4 ; i++ ){
				for(var j = 0 ; j < 4 ; j++ ){
					map[i][j]= 0;
				}
			}
		    new_num();
		    show();
		}
		
		
