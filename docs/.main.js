import { readTextFile } from './modules/edx_xhr-ajax/xhr-ajax.js';

readTextFile(
    {url: '../status.json'},
    jsonFileContent =>
    {
        const json = JSON.parse(jsonFileContent);
        const listOfVersions = document.querySelector('.list-of-versions');
        json.forEach(element =>
        {
            if (element.project)
            {
                if (element.version_current === null) element.version_current = 'N/A';
                if (element.version_target === null) element.version_target = 'N/A';
                listOfVersions.innerHTML += `
                    <div class='level4'>
                        <div class='title'>${element.project}</div>
                        <div class='version'>
                            <div class='icon clock'></div>
                            <div class='text'>
                                ${element.version_current}
                            </div>
                        </div>
                        <div class='version'>
                            <div class='icon goal'></div>
                            <div class='text'>
                                ${element.version_target}
                            </div>
                        </div>
                    </div>`;
            }
            else if (element.list_updated)
            {
                const split = element.list_updated.split('-');
                const yearNumber = parseInt(split[0]);
                const monthNumber = parseInt(split[1]);
                const dayNumber = parseInt(split[2]);
                const date = new Date(yearNumber, monthNumber - 1, dayNumber);
                const dateFormatted = date.toLocaleString
                (
                    'default',
                    {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    }
                );
                document.querySelector('.list-updated').innerHTML = dateFormatted;
            }
        });
        document.querySelector('body').classList.remove('loading');
    }
);