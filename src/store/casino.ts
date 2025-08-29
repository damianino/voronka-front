import {makeAutoObservable} from "mobx";

class Casino {
    codesTable: CodeTable = {
        "abcde": {
            certificate: "1 kofe",
            merch: "longsleeve",
            poster: "s piskoi",
        }
    }

    codeInput: string = ""

    constructor() {
        makeAutoObservable(this)
    }
}