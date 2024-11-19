import React, {ReactNode, useState} from "react";
import {twMerge} from "tailwind-merge";

type Currency = {
	currency: string;
	rate: number;
};

const EUR = {
	currency: "EUR",
	rate:     1,
};

const USD = {
	currency: "USD",
	rate:     1.2,
};

export const CurrencyContext = React.createContext<Currency>(EUR);

type CurrencyProviderProps = {
	children: ReactNode;
};
export default function CurrencyProvider({children}: CurrencyProviderProps) {
	const [currency, setCurrency] = useState<Currency>(EUR);

	// 👀 Kein Context.Provider hier!
	return (
		<CurrencyContext value={currency}>
			<div className={"flex space-x-4 p-4"}>
				<CurrencyButton onClick={() => setCurrency(EUR)} selected={currency === EUR}>
					EUR
				</CurrencyButton>
				<CurrencyButton onClick={() => setCurrency(USD)} selected={currency === USD}>
					USD
				</CurrencyButton>
			</div>
			{children}
		</CurrencyContext>
	);
}

const CurrencyButton: React.FC<{
	children: ReactNode
	onClick?(): void;
	selected?: boolean;
}> = ({children, onClick, selected}) => {
	return (
		<button
			onClick={onClick}
			className={twMerge(
				"hover:pointer rounded border border-blue-500 p-2 hover:bg-blue-700 hover:text-white",
				selected ? "bg-blue-500 hover:bg-blue-700 text-white" : "bg-white",
			)}
		>
			{children}
		</button>
	);
}