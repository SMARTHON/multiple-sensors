namespace Sensors {    
    let light_variable = ""
    let temperature_variable = ""
	let pressure_variable = ""
	let altitude_variable = ""
	let humidity_variable = ""

    // -------------- 1. Initialization ----------------
    //%blockId=initialize
    //%block="Initialize Smarthon multiple-sensor"
    //% weight=90	
    export function initializeWifi(): void {
        serial.redirect(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate9600);

        serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {
            let temp = serial.readLine()

            if (temp.charAt(0).compare("L") == 0) {

                light_variable = temp.substr(1, 10)

            } else if (temp.charAt(0).compare("T") == 0) {

                temperature_variable = temp.substr(1, 10)

            } else if (temp.charAt(0).compare("P") == 0) {

                pressure_variable = temp.substr(1, 10)

            } else if (temp.charAt(0).compare("A") == 0) {

                altitude_variable = temp.substr(1, 10)

            } else if (temp.charAt(0).compare("H") == 0) {

                humidity_variable = temp.substr(1, 10)

            } else {
                basic.showString(temp)
            }
        })

        basic.pause(5000);
    }

    //% blockId="smarthon_get_light" 
    //% block="Get light (Lx)"
    //% weight=50	
	//% blockGap=7	

    export function getLight(): string {
        return light_variable;
    }

    //% blockId="smarthon_get_temperature" 
    //% block="Get temperature (°C)"
    //% weight=49
	//% blockGap=7	

    export function getTemperature(): string {
        return temperature_variable;
    }
	
	//% blockId="smarthon_get_pressure" 
    //% block="Get pressure (hPa)"
    //% weight=48	
	//% blockGap=7	

    export function getPressure(): string {
        return pressure_variable;
    }

	//% blockId="smarthon_get_altitude" 
    //% block="Get altitude (m)"
    //% weight=47	
	//% blockGap=7	

    export function getAltitude(): string {
        return altitude_variable;
    }
	
	//% blockId="smarthon_get_humidity" 
    //% block="Get humidity (%)"
    //% weight=46		

    export function getHumidity(): string {
        return humidity_variable;
    }

	
	//% blockId="smarthon_output"
    //% block="Set output pin %pin| to intensity %intensity"
    //% intensity.min=0 intensity.max=1023
    //% weight=45	
	//% blockGap=7	
    export function TurnOutput(pin: number, intensity: number): void {
        
		serial.writeLine("o/" + pin + "/" + intensity);

    }
	
		
    //%blockId=smarthon_at
    //%block="Send AT command %command"
    //% weight=44
    	
    export function sendAT(command: string): void {
        serial.writeLine(command);
    }


}