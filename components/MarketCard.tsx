import { Card, CardHeader, CardBody, Tooltip } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react"; // Asegúrate de importar CircularProgress
import Flag from "react-world-flags";

export default function MarketCard({
  market,
  localTime,
  openTime,
  closeTime,
  selectedTime,
}: any) {
  // Calcular un porcentaje de cierre del mercado (este es un ejemplo, ajusta la lógica según tu caso)
  const marketProgress =
    ((new Date().getHours() - market.open) / (market.close - market.open)) *
    100;

  return (
    <Card key={market.name} className="shadow-lg">
      <CardHeader>
        <h3 className="text-xl font-semibold flex items-center">
          <Flag className="w-8 h-8 mr-2" code={market.flag} />
          {market.name}
        </h3>
        <div className="absolute top-2 right-2">
          <CircularProgress
            color="success"
            showValueLabel={true}
            size="lg"
            value={marketProgress}
          />
        </div>
      </CardHeader>
      <CardBody>
        <div>
          <Tooltip content="The current local time in the market's location">
            <p>Local Time: {localTime}</p>
          </Tooltip>
          <Tooltip content="The time the market opens each day (local time)">
            <p>Open: {openTime}</p>
          </Tooltip>
          <Tooltip content="The time the market closes each day (local time)">
            <p>Close: {closeTime}</p>
          </Tooltip>
        </div>
        <div className="text-right">
          <Tooltip content="The selected timezone of the market">
            <p>Selected Timezone: {selectedTime}</p>
          </Tooltip>
        </div>
      </CardBody>
    </Card>
  );
}
