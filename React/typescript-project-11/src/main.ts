import './css/style.css'
import FullList from './model/FullList'
import ListTemplate from './templates/ListTemplate'
import ListItems from './model/ListItem'

const initApp = (): void => {
    const fullList  = FullList.instance;
    const template = ListTemplate.instance;
    
    const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement;
    itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
        event.preventDefault();
        const input = document.getElementById('newItem') as HTMLInputElement;
        const newEntryText = input.value.trim();
        if (!newEntryText.length) return;

        const itemId: number = fullList.list.length 
          ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
          : 1;

        const newItem = new ListItems(itemId.toString(), newEntryText, false);
        fullList.addItem(newItem);
    })
    
    const clearItems = document.getElementById('clearItems') as HTMLButtonElement;

    clearItems.addEventListener('click', (): void => {
        fullList.clearList();
        template.clear();
    })

    fullList.load();
    template.render(fullList);
}

document.addEventListener('DOMContentLoaded', initApp);