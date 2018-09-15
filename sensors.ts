namespace Sensors {
    let distance = ""
    let light = ""
    let temperature_variable = ""

    // -------------- 1. Initialization ----------------
    //%blockId=initialize
    //%block="Initialize Smarthon multiple-sensor"
    //% weight=90	
    export function initializeWifi(): void {
        serial.redirect(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate9600);

        serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {
            let temp = serial.readLine()

            if (temp.charAt(0).compare("D") == 0) {

                distance = temp.substr(1, 3)

            } else if (temp.charAt(0).compare("L") == 0) {

                light = temp.substr(1, 3)

            } else if (temp.charAt(0).compare("T") == 0) {

                temperature_variable = temp.substr(1, 3)

            } else {
                basic.showString(temp)
            }
        })

        basic.pause(5000);
    }

    //% blockId="smarthon_get_distance" 
    //% block="Get distance (cm)"
    //% weight=49	

    export function getDistance(): string {
        return distance;
    }

    //% blockId="smarthon_get_light" 
    //% block="Get light (Lx)"
    //% weight=48	

    export function getLight(): string {
        return light;
    }

    //% blockId="smarthon_get_temperature" 
    //% block="Get temperature (°C)"
    //% weight=47

    export function getTemperature(): string {
        return temperature_variable;
    }

    //%blockId=smarthon_at
    //%block="Send AT command %command"
    //% weight=30	
    //% blockGap=7		
    export function sendAT(command: string): void {
        serial.writeLine(command);
    }


}