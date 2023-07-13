<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScoreResource;
use App\Models\Game;
use App\Models\GameVersion;
use App\Models\Score;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ScoreController extends Controller
{
    public function index($slug) {
        $game = Game::where('slug', $slug)->first();

        if ($game) {
            $game_version = GameVersion::where('game_id', $game->id)
                ->orderBy('id', 'desc')
                ->first();
            
           if ($game_version) {
                return response()->json([
                    'scores' => ScoreResource::collection($game_version->scores)
                ], 200);
           } else {
                return response()->json([
                    "status" => "not-found",     
                    "slug" => "Not found"
                ], 404);
           }
        } else {
            return response()->json([
                "status" => "not-found",     
                "slug" => "Not found"
            ], 404);
        }
    }

    public function create(Request $request,$slug) {
        $game = Game::where('slug', $slug)->first();

        if ($game) {
            $game_version = GameVersion::where('game_id', $game->id)
            ->orderBy('id', 'desc')
            ->first();
            
           if ($game_version) {
                $game = Score::create([
                    'user_id' => Auth::user()->id,
                    'game_version_id' => $game_version->id,
                    'score' => $request->score
                ]);
                
                return response()->json([
                    'status' => 'success'
                ], 201);
           } else {
                return response()->json([
                    "status" => "not-found",     
                    "slug" => "Not found"
                ], 404);
           }
        } else {
            return response()->json([
                "status" => "not-found",     
                "slug" => "Not found"
            ], 404);
        }
    }
}
