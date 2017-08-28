/**
 * Created by Yarden on 8/5/2016.
 */

(function(){
    "use strict";
    function canvasCtrl($scope, $timeout){


        var can, ctx, step, steps = 0,
            delay = 50;

        var runTextUpToDown = function (){
            step++;
            ctx.clearRect(0, 0, can.width, can.height);
            ctx.save();
            ctx.translate(can.width, step);
            ctx.textAlign = "left";
            ctx.fillText("NEW!!!",-can.width, 0);
//
//            users.foreach(function(entry){
//                ctx.fillText(entry.userName, -can.width, 15);
//            });

            ctx.fillText("Hot Chocolate Cake Recipe", -can.width, 15);
            ctx.fillText("The Best in Town !!!", -can.width, 30);

            ctx.restore();
            if (step == steps)
                step = 0;
            if (step < steps)
                $timeout(function () {
                    runTextUpToDown();
                },delay);
                // var t = setTimeout('runTextUpToDown()', delay); //delay = 50
        }

        var init = function() {
            can = document.getElementById("MyCanvas1");
            ctx = can.getContext("2d")  ;
            ctx.fillStyle = "black";
            ctx.font = "10pt Verdana";
            ctx.textBaseline = "middle";
            step = 0;
            steps = can.height + 10;
            runTextUpToDown();
        }

        init();

        // $scope.init();
    }
    angular.module('recipesApp').controller('canvasCtrl', ['$scope', '$timeout', canvasCtrl])
})();