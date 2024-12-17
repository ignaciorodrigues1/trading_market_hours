"use client";
import { useState } from "react";
import {
  Select,
  SelectItem,
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Progress,
  TableColumn,
  getKeyValue,
  Tooltip,
} from "@nextui-org/react";
import moment from "moment-timezone";
import Flag from "react-world-flags";
import MarketCard from "@/components/MarketCard";

const columns = [
  {
    key: "market",
    label: "Market",
  },
  {
    key: "open",
    label: "Open",
  },
  {
    key: "close",
    label: "Close",
  },
  {
    key: "timeline",
    label: "Timeline",
  },
];

// Zonas horarias y horarios de los mercados
const markets = [
  { name: "Sydney", timezone: "Australia/Sydney", open: 7, close: 15, flag: "AU" },
  { name: "Tokyo", timezone: "Asia/Tokyo", open: 5, close: 13, flag: "JP" },
  { name: "London", timezone: "Europe/London", open: 8, close: 16, flag: "GB" },
  { name: "New York", timezone: "America/New_York", open: 9, close: 17, flag: "US" },
  { name: "Hong Kong", timezone: "Asia/Hong_Kong", open: 9, close: 17, flag: "HK" },
  { name: "Singapore", timezone: "Asia/Singapore", open: 9, close: 17, flag: "SG" },
  { name: "Frankfurt", timezone: "Europe/Berlin", open: 8, close: 16, flag: "DE" },
  { name: "Paris", timezone: "Europe/Paris", open: 8, close: 16, flag: "FR" },
  { name: "Zurich", timezone: "Europe/Zurich", open: 8, close: 16, flag: "CH" },
  { name: "Shanghai", timezone: "Asia/Shanghai", open: 9, close: 15, flag: "CN" },
  { name: "Moscow", timezone: "Europe/Moscow", open: 10, close: 18, flag: "RU" },
  { name: "Dubai", timezone: "Asia/Dubai", open: 9, close: 17, flag: "AE" },
  { name: "São Paulo", timezone: "America/Sao_Paulo", open: 10, close: 18, flag: "BR" },
  { name: "Toronto", timezone: "America/Toronto", open: 9, close: 17, flag: "CA" },
  { name: "Seoul", timezone: "Asia/Seoul", open: 9, close: 15, flag: "KR" },
  { name: "Mumbai", timezone: "Asia/Kolkata", open: 9, close: 17, flag: "IN" },
  { name: "Mexico City", timezone: "America/Mexico_City", open: 9, close: 17, flag: "MX" },
  { name: "Buenos Aires", timezone: "America/Argentina/Buenos_Aires", open: 10, close: 18, flag: "AR" },
  { name: "Cape Town", timezone: "Africa/Johannesburg", open: 9, close: 17, flag: "ZA" },
  { name: "Kuala Lumpur", timezone: "Asia/Kuala_Lumpur", open: 9, close: 17, flag: "MY" },
  { name: "Jakarta", timezone: "Asia/Jakarta", open: 9, close: 17, flag: "ID" },
  { name: "Istanbul", timezone: "Europe/Istanbul", open: 9, close: 17, flag: "TR" },
  { name: "Lima", timezone: "America/Lima", open: 9, close: 17, flag: "PE" },
  { name: "Warsaw", timezone: "Europe/Warsaw", open: 9, close: 17, flag: "PL" },
  { name: "Madrid", timezone: "Europe/Madrid", open: 9, close: 17, flag: "ES" },
  { name: "Cairo", timezone: "Africa/Cairo", open: 9, close: 17, flag: "EG" },
  { name: "Riyadh", timezone: "Asia/Riyadh", open: 9, close: 17, flag: "SA" },
  { name: "Lagos", timezone: "Africa/Lagos", open: 9, close: 17, flag: "NG" }
];

export default function Home() {
  const [timezone, setTimezone] = useState("America/New_York");

  // Generar horarios en base a la zona seleccionada
  const formatHours = (market: any) => {
    const openTime = moment
      .tz({ hour: market.open }, market.timezone)
      .tz(timezone)
      .format("hh:mm A");
    const closeTime = moment
      .tz({ hour: market.close }, market.timezone)
      .tz(timezone)
      .format("hh:mm A");
    const localTime = moment.tz(market.timezone).format("hh:mm A");
    const selectedTime = moment.tz(timezone).format("hh:mm A");
    return { openTime, closeTime, localTime, selectedTime };
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">World Market Hours</h1>

      {/* Selector de zona horaria */}
      <Select
        label="Select your timezone"
        placeholder="Choose timezone"
        onChange={(e) => setTimezone(e.target.value)}
        selectedKeys={[timezone]}
      >
        {moment.tz.names().map((tz) => (
          <SelectItem key={tz} value={tz}>
            {tz}
          </SelectItem>
        ))}
      </Select>

      {/* Tarjetas con horarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {markets.map((market: any) => {
          const { openTime, closeTime, localTime, selectedTime } = formatHours(market);
          return (
            <MarketCard key={market.name} market={market} localTime={localTime} openTime={openTime} closeTime={closeTime} selectedTime={selectedTime} />
          );
        })}
      </div>

      {/* Tabla con franjas horarias */}
      <h2 className="text-2xl font-bold mt-8">Market Hours Timeline</h2>
      <div className="overflow-x-auto mt-4">
         <Table
            aria-label="Market hours by timezone"
            color="primary"
            className="mt-4"
          >
            <TableHeader>
              <TableColumn>Market</TableColumn>
              <TableColumn>Open</TableColumn>
              <TableColumn>Close</TableColumn>
              <TableColumn>Timeline</TableColumn>
            </TableHeader>
            <TableBody>
              {markets.map((market) => {
                const { openTime, closeTime } = formatHours(market);
                const currentHour = moment.tz(timezone).hour();
                const isOpen = currentHour >= market.open && currentHour < market.close;
                const progress = Math.min(
                  Math.max(((currentHour - market.open) / (market.close - market.open)) * 100, 0),
                  100
                );
                const percentagePassed = progress.toFixed(1);
                const percentageRemaining = (100 - progress).toFixed(1);    

                return (
                  <TableRow key={market.name}>
                    <TableCell className="flex items-center gap-4">
                      <Flag code={market.flag} className="w-8 h-8 mr-2" /> {market.name}
                    </TableCell>
                    <TableCell>{openTime}</TableCell>
                    <TableCell>{closeTime}</TableCell>
                    <TableCell>
                      <Tooltip
                        content={`Progress: ${percentagePassed}% | Remaining: ${percentageRemaining}%`}
                      >
                        <Progress
                          value={progress}
                          color={isOpen ? "success" : "danger"}
                          label={isOpen ? "Open" : "Closed"}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
      </div>
    </div>
  );
}
