"use strict";

let logoutButton = new LogoutButton();
let ratesBoard = new RatesBoard();
let moneyManager = new MoneyManager();
let favoritesWidget = new FavoritesWidget();
getStocksDec();



logoutButton.action = () => ApiConnector.logout(response => {
    if(!response.success){
        throw new Error(response.error);
    }
    location.reload();
});

ApiConnector.current(response => {
    if(!response.success){
        throw new Error(response.error);
    }
    ProfileWidget.showProfile(response.data);
});

function getStocksDec(){
    ApiConnector.getStocks(response => {
        if(!response.success){
            throw new Error(response.error);
        }
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    });
    setInterval(getStocksDec, 60000);
}

moneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data,response => {
    if(!response.success){
        moneyManager.setMessage(false, response.error);
        throw new Error(response.error);
    }
    ProfileWidget.showProfile(response.data);
    moneyManager.setMessage(true, 'Счет пополнен');
});

moneyManager.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, response => {
    if(!response.success){
        moneyManager.setMessage(false, response.error);
        throw new Error();
    }
    ProfileWidget.showProfile(response.data);
    moneyManager.setMessage(true, 'Конвертация валюты произошла успешно');
})

moneyManager.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, response => {
    console.log(data, response)
    if(!response.success){
        moneyManager.setMessage(false, response.error);
        throw new Error();
    }
    ProfileWidget.showProfile(response.data);
    moneyManager.setMessage(true, 'Перевод средств произошел успешно');
})

ApiConnector.getFavorites( response => {
    if (!response.success){
        throw new Error;
    }
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
});

favoritesWidget.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, response => {
    if (!response.success){
        favoritesWidget.setMessage(false, response.error)
        throw new Error;
    }
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
    favoritesWidget.setMessage(true, 'Пользователь успешно добавлен');

})

favoritesWidget.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, response => {
    if (!response.success){
        favoritesWidget.setMessage(false, response.error);
        throw new Error;
    }
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
    favoritesWidget.setMessage(true, 'Пользователь успешно удален');
})

