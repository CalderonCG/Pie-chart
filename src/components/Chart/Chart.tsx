import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { SkillType } from "../../App";
import "./Chart.scss";

//Types-----------------------------------------------------------------
type ChartProps = {
  data: SkillType[];
  points: number;
};

function Chart({ data, points }: ChartProps) {
  
  //Chart setup--------------------------------------------------------------------------------------------
  const chartRef = useRef<SVGSVGElement | null>(null); // Reference for chart

  useEffect(() => {
    const usedData: SkillType[] = [...data, { skill: "Total", points: points, type: "Total", status:"EQUIPPED" }];
    //svg container
    const w = 200;
    const h = 200;
    const radius = w / 2;
    const innerRadius = radius - 10;
    const svg = d3.select(chartRef.current).attr("width", w).attr("height", h);

    //center svg
    const g = svg
      .append("g")
      .attr("transform", `translate(${w / 2}, ${h / 2})`);

    //generating chart
    const chartData = d3.pie().value((d: SkillType) => d.points)(usedData);
    const chartArc = d3.arc().innerRadius(innerRadius).outerRadius(radius);


    //mapping svg
    g.selectAll()
      .data(chartData)
      .join("path")
      .attr("d", chartArc)
      .attr("fill", (d) =>
        d.data.type === "Utility" ?  "#cc488d" : d.data.type === 'Hammer' ? "#cc3623" :
      d.data.type === 'Jump' ? "#2f71a9"  : "#d9efa2"
      );
  }, [data]);

  return (
    <div className="chart">
      <svg ref={chartRef} />
      <div className="chart_available">
        <p className="chart_available_label">Remaining BP</p>
        <p className="chart_available_points">{points} / 40</p>
      </div>
    </div>
  );
}

export default Chart;
