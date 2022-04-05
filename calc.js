// Lýsa yfir föstum
const hour_cost = 0 //kostnaður á hverja klukkustund
const food_small = 0 //kostnaður fyrir morgunverð
const food_big = 0 //kostnaður fyrir hádegismat
const hour_cost_big = 0//kostnaður  fyrir klukkustund yfir venjulegan tíma 
const hour_cost_mega = 0 // kostnaður ef meiri á hvern tíma yfir hour_cost_mega

// Lýsa yfir global breytum
var quantity
var hours
var result_div
var time_cost
var food_cost
var result
     
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function calculate(){
    // Reiknar kostnað miðað við innsettar upplýsingar
    result_div = document.getElementById("result_div")
    quantity = Number(document.getElementById("quantity").value)
    hours = Number(document.getElementById("hours").value)

    if(quantity === 0 || hours === 0){
        result = 0
    }else{
        food_cost = food_small
        if(quantity === 1){
            if(hours <= 8){
                time_cost = hour_cost * hours;
            }else if(hours > 8 && hours <= 9){
                time_cost = hour_cost * 8
                time_cost += hour_cost_big * (hours - 8)
            }else if(hours > 9){
                time_cost = hour_cost * 8
                time_cost += hour_cost_big * 1
                time_cost += hour_cost_mega * (hours-9)
            }
        }else if(quantity > 1 ){
            // Reikningur á tíma kostnaði með systkyna afslætti
            if(hours <= 8){
                time_cost = Number((hour_cost+(hour_cost*0.25)) * hours);
            }else if(hours > 8 && hours <= 9){
                time_cost = Number((hour_cost+(hour_cost * 0.25)) * 8);
                time_cost += Number((hour_cost_big+(hour_cost_big * 0.25)) * (hours-8));
            }else if(hours > 9){
                time_cost = Number((hour_cost+(hour_cost*0.25)) * 8.5);
                time_cost += Number((hour_cost_big+(hour_cost_big*0.25)) * 0.5);
                time_cost += Number((hour_cost_mega+(hour_cost_mega*0.25)) * (hours-9));
            }
        }

        // Reikna matarkostnað miðað við fjölda klukkustunda
        if(hours >= 7){
            food_cost += food_big+food_small
        } else if( hours >= 5){
            food_cost += food_big
        }
        food_cost *= quantity
        result = time_cost + food_cost
    }
    // Birtir niðurstöður 
    result = Math.round(result)
	time_cost = Math.round(time_cost)
	food_cost = Math.round(food_cost)
	time_cost = numberWithCommas(time_cost)
	food_cost = numberWithCommas(food_cost)
	result = numberWithCommas(result)
		if(quantity > 1){
		children = "börn";
	} else{
		children = "barn";
	}
    result_div.innerHTML = "<h4>Heildarkostnaður: "+result+" kr.</h4><p>Að vera með "+quantity+" "+children+" í "+hours+" klukkutíma á dag kostar "+result+" kr á mánuði.</p><p><strong>Sundurliðun</strong></p><p>Miðað við þínar forsendur má reikna með að leikskólagjöldin séu eftirfarandi:</p><p>Dvalargjald: "+time_cost+" kr.</p><p>Fæðisgjald: "+food_cost+" kr.</p><p><strong>Samtals: "+result+"</strong></p>"
}
