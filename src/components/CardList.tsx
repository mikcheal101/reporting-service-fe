import React from 'react'
import Card from './PaymentCard';


interface CardItem
{
    title: string;
    amount:string;
    change: string;
    count: number;  
}

interface CardListProps
{
    cardItems : CardItem[] 
}


const CardList: React.FC<CardListProps> = ( { cardItems } ) => {
  return (
    <div className="grid grid-cols-4 p-4 gap-4" >
        {cardItems.map((card, index) => 
        ( 
            <Card key={ index } {...card } />
        ))}
    </div>
  )
}

export default CardList