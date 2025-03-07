# Notes

In this document, I would like to write a few notes about this exercise.

## Instructions

To use the app, simply run:

```sh
npm install
npm run start
```

Then navigate to `localhost:8080`. You will be presented with a site containing two links.

-   The first link takes you to the **FullInfo** component example. If you change the ISBN in the URL, the info for the corresponding book will be displayed.
-   The second link leads to the **search page**, where you can search for any book using the input field. The request is triggered automatically after you finish typing. You can then hover over the results to view more details about the book.

## Progression

First, I started by reading the instructions and focusing on getting the core functionality working. Once I had an implementation that was mostly correct, I moved on to testing.

While writing tests, I had to do a lot of refactoring because the existing app design made testing difficult. To improve this, I extracted all data-fetching functionality into standalone functions and later into custom hooks. This allowed me to mock these functions more easily, making the application simpler to test.

After finishing the tests, I reviewed the app, made final visual improvements, and fixed minor bugs along the way.

## Possible Improvements

Since I had limited time to work on this, there are several improvements that could enhance the user experience:

1. **Caching layer** – Right now, none of the data-fetching is cached, which means repeated searches always trigger new requests. Implementing **React Query** would help cache responses, reducing unnecessary network calls and improving performance.
2. **Prefetching data** – When hovering over search results, there’s a noticeable delay while fetching additional book details, making the app feel sluggish. A better approach would be to prefetch data for all visible results and store them in a caching layer, ensuring details load instantly when hovered over.
3. **Better user feedback** – The app could use more loading indicators, especially for images and additional book details. Right now, it’s not always clear when data is still loading, which can make interactions feel unresponsive.
4. **More polished visuals** – Since CSS was added as a last step without a clear design plan, the UI could be more consistent. A structured approach with better spacing, typography, and color choices would make the app feel more refined.
5. **Canceling in-flight search queries** – Currently, if you type quickly, you might receive outdated results from a previous query, leading to a confusing experience. To fix this, I would implement a mechanism to either cancel previous requests when a new one starts or ignore outdated responses when they return.
