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

            } else if (temp.charAt(0).compare("P") == 10) {

                pressure_variable = temp.substr(1, 10)

            } else if (temp.charAt(0).compare("A") == 10) {

                altitude_variable = temp.substr(1, 10)

            } else if (temp.charAt(0).compare("H") == 10) {

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

    export function getLight(): string {
        return light_variable;
    }

    //% blockId="smarthon_get_temperature" 
    //% block="Get temperature (°C)"
    //% weight=49

    export function getTemperature(): string {
        return temperature_variable;
    }
	
	//% blockId="smarthon_get_pressure" 
    //% block="Get pressure (hPa)"
    //% weight=48	

    export function getPressure(): string {
        return pressure;
    }

	//% blockId="smarthon_get_altitude" 
    //% block="Get altitude (m)"
    //% weight=47	

    export function getAltitude(): string {
        return altitude;
    }
	
	//% blockId="smarthon_get_humidity" 
    //% block="Get humidity (%)"
    //% weight=46	

    export function getHumidity(): string {
        return humidity;
    }
    //%blockId=smarthon_at
    //%block="Send AT command %command"
    //% weight=30	
    //% blockGap=7		
    export function sendAT(command: string): void {
        serial.writeLine(command);
    }


}