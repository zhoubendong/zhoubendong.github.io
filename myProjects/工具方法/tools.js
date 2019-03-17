	

			/* 	----------- 我的 js 封装工具方法 ------------- */
	

	/*  1.   绑定事件的兼容性方法      */     

		function addEvent(elem,type,haddle) {
			if(elem.addEventListener) {
				elem.addEventListener(type,handle,flase);
			}else if(elem.attachEvent) {
				elem.attachEvent('on' + type,function () {
					handle.call(elem);
				})
			}else{
				elem['on' + type] = handle;
			}
		}

	/*  2.    数组去重    */

	    Array.prototype.array_remove = function () {
	        var temp = {},
	            arr =[],
	            len = this.length;
	        for(var i = 0; i < len; i ++){
	            if (!temp[this[i]]) {
	                temp[this[i]] = "abc";
	                arr.push(this[i]);
	            }
	        }
	        return arr;
	    }

	/*   3.   阻止默认事件 （表单提交，a标签跳转，右键菜单） */

        function cancelHaddler(event) {
            if(event.preventDefault) {
                event.preventDefault();
            }else if(event.returnValue) {
                event.returnValue = false;
            }
        }

    /*	4.   获取css属性的兼容性方法   */

	    function getStyle(elem,prop) {
	        if(window.getComputedStyle) {
	            return window.getComputedStyle(elem,null)[prop];
	        }else{
	            return elem.currentStyle[prop];
	        }
	    }

	/*	5.	按需执行(异步加载)	*/

		function loadScript(url,callback) {
			var script = document.createElement('script');
			script.type = "text/javascript";
			
			if(script.readyState){
				script.onreadystatechange = function () {
					//IE方法
					if(script.readyState == "complete" || script.readyState == "loaded") {
						tools[callback]();
					}
				}
			}else{
				script.onload = function () {
				// 除了IE
				tools[callback]();
				}
			}
			script.src = url;
			document.head.appendChild(script);
		}
		// 		   用法
		//loadScript('demo.js',"test");
		// 	var tools = {
		// 	test : function () {
		// 		console.log("a");
		// 	},
		// 	demo : function () {
		// 		console.log('b');
		// 	}
		// 	}

	/*   6.    封装后的Typeof方法           */
   
        function myTypeof(target){
            var ret = typeof(target);
            var template = {
                "[object Array]" : "array",
                "[object Object]" : "object",
                "[object Number]" : "number - object",
                "[object Boolean]" : "boolean - object",
                "[object String]" : "string - object"
            };
            if (target === null) {
                return "null";
            }else if(ret == 'object') {
                var str = Object.prototype.toString.call(target);
                return template[str];
            }else{
                return ret;
            }
        }

    /**  7.   阻止事件冒泡      */

        function stopBubble(event) {
            if(event.stopPropagation) {
                event.stopPropagation();
            }else{
                e.cancelBubble = true;
            }
        }