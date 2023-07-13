<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScoreAuthorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'game' => [
                'slug' => $this->game_version->game->slug,
                'title' => $this->game_version->game->title,
                'description' => $this->game_version->game->description
            ],
            'score' => $this -> score,
            'timestamp' => $this->created_at
        ];
    }
}
