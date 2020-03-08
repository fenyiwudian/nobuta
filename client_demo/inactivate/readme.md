
当tab未激活时
+ setInterval和setTimeout的delay值会扩大到最小1秒
+ requestAnimationFrame会被暂停

所以如果有后台运行的的快速测试任务，则未激活后，这些任务的执行速度会大大减慢。