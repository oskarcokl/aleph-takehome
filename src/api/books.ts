type IdType = 'isbn' | 'lccn' | 'oclc' | 'olid';

export async function getAdditionalInfo(idType: IdType, idValue: string) {
    if (idValue === '') {
        throw Error('idValue needs to be a non empty string');
    }

    const response = await fetch(
        `https://openlibrary.org/api/books?bibkeys=${idType}:${idValue}&jscmd=details&format=json`
    );
    const data = (await response.json())[`${idType}:${idValue}`];

    return data;
}
