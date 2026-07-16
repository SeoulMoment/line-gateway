export async function dispatchMessage(event: any) {

    switch (event.type) {

        case "message":
            console.log("Message Event");
            break;

        case "follow":
            console.log("Follow Event");
            break;

        case "postback":
            console.log("Postback Event");
            break;

        default:
            console.log("Unknown Event");
    }

}