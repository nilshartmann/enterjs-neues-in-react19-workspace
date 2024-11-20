"use client";


import {useOptimistic, useState, useTransition} from "react";
import {increaseLike} from "@/app/books/components/like.action";
import Header from "@/app/books/components/Header";

type LikeWidgetProps = {
	id: string;
	likes: number;
}

export default function LikeWidget({id, likes}: LikeWidgetProps) {

	const [result, setResult] = useState("")

	const [isPending, startTransition] = useTransition();
	const [optimisticLike, setOptimisticLike] = useOptimistic(likes, (currentLikes, amount: number) => {
		return currentLikes + amount;
	});


	// CLIENT!
	function handleLike() {
		startTransition(async () => {
			setOptimisticLike(1);
			//                      v------------------- SERVER-CALL!
			const response = await increaseLike(id);
			setResult(response);

			// onUpdate(updatedBook);
		})
	}

	return <span >
		<Header />
		{likes}
		<span onClick={() => handleLike()} className={"cursor-pointer underline"}>Like!</span>
		{result}
	</span>

}