/* 添加控制器 */
app.controller("baseController",function ($scope) {

    /* 分页指令配置信息对象 */
    $scope.paginationConf ={
        /*配置分页信息*/
        currentPage:1,  //当前页
        totalItems:0,  //总条数
        itemsPerPage:5, //页大小
        perPageOptions:[1,2,3,4,5,6,7,8,9,10], //每页显示多少

        /*当页码改变时重新加载数据*/
        onChange:function () {
            $scope.reload();
        }
    };

    /* 重新加载表数据 */
    $scope.reload = function () {
        //切换页码
        $scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage);
    }



    /*定义复选框选中的品牌id*/
    $scope.ids =[];

    /*为复选框 checkbox绑定点击事件*/
    $scope.updateSelection = function ($event,id) {
        //$event.target:获取选中的复选框dom元素
        //$event.target.checked 获取当前状态(选中为true,未选中为false)
        if($event.target.checked){ //选中
            //如果北选中就加入数组中
            $scope.ids.push(id)

        }else { //取消选中
            // 获取元素在数组中的索引值
            var idx = $scope.ids.indexOf(id);
            // 根据索引号删除数组中的元素
            /*
                第一个参数: 元素在数组中的索引号
                第二个参数: 删除元素个数
            * */
            $scope.ids.splice(idx,1);
        }
    };

    /* 提取josn字符串中的某个属性 */
    $scope.jsonArr2Str = function (jsonArrStr,key) {
        //将json字符串转换成json对象
        var jsonArr = JSON.parse(jsonArrStr);
        //定义一个新的数组
        var resArr = [];
        //迭代数组
        for (var i = 0; i < jsonArr.length; i++){
            // 取数组中的一个元素
            var json = jsonArr[i];
            // 把json对象的值添加到新数组
            resArr.push(json[key]);
        }
        // 返回数组中的元素用逗号分隔的字符串
        return resArr.join(",");
    }

})