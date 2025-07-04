import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

type DataItem = {
  name: string;
  stock: number;
  sales: number;
};

const sampleData: DataItem[] = [
  { name: "商品A", stock: 120, sales: 80 },
  { name: "商品B", stock: 60, sales: 150 },
  { name: "商品C", stock: 200, sales: 40 },
  { name: "商品D", stock: 90, sales: 110 },
];

const InventoryChart: React.FC<{ data?: DataItem[] }> = ({
  data = sampleData,
}) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 500;
    const height = 300;
    const margin = { top: 40, right: 30, bottom: 40, left: 50 };

    const x0 = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .rangeRound([margin.left, width - margin.right])
      .paddingInner(0.2);

    const x1 = d3
      .scaleBand()
      .domain(["stock", "sales"])
      .rangeRound([0, x0.bandwidth()])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.stock, d.sales))! * 1.1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3
      .scaleOrdinal<string>()
      .domain(["stock", "sales"])
      .range(["#60a5fa", "#f87171"]);

    // X軸
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x0));

    // Y軸
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // 長條
    svg
      .append("g")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", (d) => `translate(${x0(d.name)},0)`)
      .selectAll("rect")
      .data((d) => [
        { key: "stock", value: d.stock },
        { key: "sales", value: d.sales },
      ])
      .join("rect")
      .attr("x", (d) => x1(d.key)!)
      .attr("y", (d) => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", (d) => y(0) - y(d.value))
      .attr("fill", (d) => color(d.key)!);

    // 標籤
    svg
      .append("g")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", (d) => `translate(${x0(d.name)},0)`)
      .selectAll("text")
      .data((d) => [
        { key: "stock", value: d.stock },
        { key: "sales", value: d.sales },
      ])
      .join("text")
      .attr("x", (d) => x1(d.key)! + x1.bandwidth() / 2)
      .attr("y", (d) => y(d.value) - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "#333")
      .attr("font-size", 12)
      .text((d) => d.value);

    // 圖例
    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width - margin.right - 100},${margin.top - 30})`
      );
    ["stock", "sales"].forEach((key, i) => {
      legend
        .append("rect")
        .attr("x", 0)
        .attr("y", i * 20)
        .attr("width", 16)
        .attr("height", 16)
        .attr("fill", color(key)!);
      legend
        .append("text")
        .attr("x", 24)
        .attr("y", i * 20 + 12)
        .text(key === "stock" ? "庫存量" : "銷售量")
        .attr("font-size", 14)
        .attr("fill", "#333");
    });
  }, [data]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">庫存量與銷售量圖表</h2>
      <svg ref={ref} width={500} height={300}></svg>
    </div>
  );
};

export default InventoryChart;
