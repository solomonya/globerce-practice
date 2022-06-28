// import {
//   ContentType,
//   Controller,
//   Get,
//   Param,
//   Post,
//   QueryParam,
//   Req,
//   Res,
// } from 'routing-controllers';
// import { Request, Response } from 'express';
// import {
//   ESearchAutocompleteTypes,
//   TSearchAutocompleteItem,
//   TSearchAutocompleteItemHistoryResult,
// } from '../src/scripts/models/search-autocomplete';

// @Controller()
// export default class SearchController {
//   private history: Array<TSearchAutocompleteItemHistoryResult> = [
//     {
//       id: 0,
//       title: 'Айфон',
//       url: '/pages/webview/search/index.html?q=Айфон',
//     },
//     {
//       id: 6,
//       title: 'Смартфоны',
//       url: '/pages/webview/search/index.html?q=Смартфоны',
//     },
//   ];

//   @Get('/search-suggest/')
//   @ContentType('application/json')
//   autocomplete(
//     @Req() request: Request,
//     @Res() response: Response,
//     @QueryParam('q') searchText: string
//   ): Array<TSearchAutocompleteItem> {
//     return [
//       {
//         type: ESearchAutocompleteTypes.HISTORY,
//         items: [
//           {
//             id: 6,
//             title: 'Смартфоны',
//             url: '/pages/webview/search/index.html?q=Смартфоны',
//           },
//         ],
//       },
//       {
//         type: ESearchAutocompleteTypes.SEARCH,
//         items: [
//           {
//             title: 'Смартфоны',
//             subtitle: 'Смартфоны',
//             url: '/pages/webview/search/index.html?q=Смартфоны',
//           },
//         ],
//       },
//       {
//         type: ESearchAutocompleteTypes.HOT,
//         items: [
//           {
//             title: 'Смартфоны',
//             url: '/pages/webview/search/index.html?q=Смартфоны',
//           },
//         ],
//       },
//     ];
//   }

//   @Post('/search-history/clear/')
//   clearSearchHistory() {}

//   @Post('/search-history/remove/:id')
//   removeSearchHistory(@Param('id') id: number): void {}
// }
