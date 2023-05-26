import { FC , useContext} from "react";
import { Categories, Transaction, TransactionContext } from "../../context/TransactionContext";

const StackedBarChart: FC = () => {
  const { transactions } = useContext(TransactionContext);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-GB');

  const month = formattedDate.substring(3, 5) as unknown as number;
  //const day = formattedDate.substring(3, 5);
  //const year = formattedDate.substring(3, 5);

  const month1: Transaction[] = [];
  const month1Total = 0;
  
  const month2: Transaction[] = [];
  const month2Total = 0;
  const month3: Transaction[] = [];
  const month3Total = 0;
  const month4: Transaction[] = [];
  const month4Total = 0;
  const month5: Transaction[] = [];
  const month5Total = 0;

  for (let i = 0; i < transactions.length; i++) {

    if (transactions[i].date.getMonth as unknown as number == month) { 
      month1.push(transactions[i]);
    }
    if (transactions[i].date.getMonth as unknown as number - 1 == month -1) { 
      month2.push(transactions[i]);
    }
    if (transactions[i].date.getMonth as unknown as number - 2 == month -2) { 
      month3.push(transactions[i]);
    }
    if (transactions[i].date.getMonth as unknown as number - 3 == month -3) { 
      month4.push(transactions[i]);
    }
    if (transactions[i].date.getMonth as unknown as number - 4 == month -4) { 
      month5.push(transactions[i]);
    }

    const initialDict = {
      ENTERTAINMENT: 0,
      GROCERIES: 0,
      RESTAURANT: 0,
      UTILITIES: 0,
      MISC: 0,
    };
    
    const monthDicts: { [key in Categories]: number }[] = [];
    
    for (let i = 0; i < 5; i++) {
      monthDicts.push({ ...initialDict });
    }
    
    for (let i = 0; i < month1.length; i++) {
      if (month1[i].category == 'Groceries') { 
        month1Dict['Groceries'] += month1[i].amount;
      }
      if (month1[i].category == 'Entertainment') { 
        month1Dict['Entertainment'] += month1[i].amount;
      }
      if (month1[i].category == 'Restaurant') { 
        month1Dict['Restaurant'] += month1[i].amount;
      }
      if (month1[i].category == 'Utilities') { 
        month1Dict['Utilities'] += month1[i].amount;
      }
      if (month1[i].category == 'Misc') { 
        month1Dict['Misc'] += month1[i].amount;
      }
    }


    

    sampleDict['newKey'] = 'newValue'
  
    for (const [key, value] of Object.entries(sampleDict)) {
      console.log(`${key}: ${value}`);
    }

    // or do this
    Object.values(sampleDict)

    //for loop to put transactions that are in past 5 month
    //for loop for each of those months to get total cost and distrubtution x5


    console.log(transactions[i]);
  }
  
  return (
    <div>StackedBarChart</div>
  )
}

export default StackedBarChart