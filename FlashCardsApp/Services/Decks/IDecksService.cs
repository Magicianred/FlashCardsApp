﻿using System.Threading.Tasks;

using FlashCardsApp.Models.Decks;

namespace FlashCardsApp.Services.Decks
{
    public interface IDecksService
    {
        Task<AllDecksServiceModel> GetAllAsync(string userId);

        Task CreateAsync(string userId, string name, string description);

        Task<bool> UdateAsync(int id, string name, string description);

        Task<bool> DeleteAsync(int id);

        Task<string> GetDeckNameAsync(int id);
    }
}
