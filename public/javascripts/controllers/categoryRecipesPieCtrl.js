(function(){
    "use strict";
    function categoryRecipesPieCtrl(){
        var self = this;

        var width = 960,
            height = 500,
            radius = Math.min(width, height) / 2;

        var colors = ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099"];

        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var labelArc = d3.svg.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d.recipes; });

        var svg = d3.select("#userRecipiesGraph").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        d3.json("/api/dataservice/GetAllCategoriesRecipes", function(error, data) {
            if (!_.isEmpty(data)){
                data = data.filter(function(i) { return i.recipes > 0; });
                data.sort(function(a, b){ return b.recipes-a.recipes; });

                if (error) throw error;

                var g = svg.selectAll(".arc")
                    .data(pie(data))
                    .enter().append("g")
                    .attr("class", "arc");

                g.append("path")
                    .attr("d", arc)
                    .style("fill", function(d, i) { return colors[i % 5]; });

                g.append("text")
                    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
                    .attr("dy", ".35em")
                    .text(function(d) { return d.data.name + ' (' + d.data.recipes + ')'; });
            }


        });
    }
    angular.module('graphModule').controller('categoryRecipesPieCtrl', [categoryRecipesPieCtrl])
})();