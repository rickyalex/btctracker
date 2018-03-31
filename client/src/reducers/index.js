let BtcData = {
    Ask: 0,
    Last: 0,
    Bid: 0
}

export default (state = BtcData, action) => {
    switch (action.type) {
        case 'GET_BTC_DATA':
            const { Ask, Last, Bid } = action;
            BtcData = {
                Ask,
                Last,
                Bid
            }
            return BtcData;
        default:
            return state;
    }
}