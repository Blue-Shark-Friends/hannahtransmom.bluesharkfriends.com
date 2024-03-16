
import PartSelector from './PartSelector';


export default function MeetMyParts({ showHannah, onClick }) {

    return (
        <div>
            { 
                !showHannah
                ? 
                (
                    <button onClick={onClick}>
                        Let's try this.
                    </button>
                )
                :
                (
                <div>
                    <PartSelector />
                </div>
                )    
            }
        </div>
    )
}
