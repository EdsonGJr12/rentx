import SpeedSvg from "../assets/speed.svg";
import ForceSvg from "../assets/force.svg";
import AccelerationSvg from "../assets/acceleration.svg";
import GasolineSvg from "../assets/gasoline.svg";
import EnergySvg from "../assets/energy.svg";
import HybridSvg from "../assets/hybrid.svg";
import ExchangeSvg from "../assets/exchange.svg";
import PeopleSvg from "../assets/people.svg";
import CarSvg from "../assets/car.svg";

export function getAccessoryIcon(type: string) {
    switch(type) {
        case 'speed':
            return SpeedSvg;
        case 'acceleration':
            return ForceSvg;
        case 'turning_diameter':
            return AccelerationSvg;
        case 'gasoline_motor':
            return GasolineSvg;
        case 'speed':
            return SpeedSvg;
        case 'electric_motor':
            return EnergySvg;
        case 'hibryd_motor':
            return HybridSvg;
        case 'exchange':
            return ExchangeSvg;
        case 'seats':
            return PeopleSvg;
        default:
            return CarSvg;
    }
}