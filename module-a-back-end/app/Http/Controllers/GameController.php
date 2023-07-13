<?php

namespace App\Http\Controllers;

use App\Http\Requests\GameRequest;
use App\Http\Resources\GameResource;
use App\Models\Game;
use App\Models\GameVersion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GameController extends Controller
{
    public function index(Request $request) {
        $gamesQuery = Game::query();
        $games_count = Game::all()->count();

        $sortDir = 'asc';
        $sortBy = 'title';

        if ($request->sortDir == 'desc') {
            $sortDir = $request->sortDir;
        }

        if ($request->sortBy == 'popular') {
            $sortBy = 'updated_at';
        } else if ($request->sortBy == 'uploaddate') {
            $sortBy = 'created_at';
        }

        $gamesQuery->orderBy($sortBy, $sortDir);

        $games = $gamesQuery->paginate(10);

        return response()->json([
            'page'=> $games->currentPage(),
            'size'=> $games->count(),
            'totalElements' => $games_count,
            'content' => GameResource::collection($games)
        ], 200);
    }
    
    // ! create
    public function create(GameRequest $request) {
        $request->validated($request->all());
        
        $slug = implode('-', explode(' ', strtolower($request->title)));

        if (Game::where('slug', $slug)->first()) {
            return response()->json([
                "status" => "invalid",     
                "slug" => "Game title already exists"
            ], 400);
        } 

        $game = Game::create([
            'title' => $request->title,
            'slug' => $slug,
            'description' => $request->description,
            'user_id' => Auth::user()->id
        ]);

        return response()->json([
            'status' => 'success',
            'slug' => $slug,
        ]);
    }


    // ! show
    public function show(Request $request, $slug) {
        $game = Game::where('slug', $slug)->first();

        if ($game) {
            $game_version = GameVersion::where('game_id', $game->id)
            ->orderBy('id', 'desc')
            ->first();

            $scores_count = 0;
            $path = '';
            if ($game_version) {
                $path = $game_version->files_path;
                if ($game_version->scores != null) {
                    foreach ($game_version->scores as $g ) {
                        $scores_count += intval($g->score);
                    }
                }
            }

            return response()->json([
                'slug' => $game->slug,
                'title' => $game->title,
                'description' => $game->description,
                'thumbnail' => '',
                'uploadTimestamp' => $game->created_at,
                'author' => $game->user->username,
                'scoreCount' => $scores_count,
                'gamePath' => $path
            ], 200);
        } else {
            return response()->json([
                "status" => "not-found",     
                "slug" => "Not found"
            ], 404);
        }
    }

    // ! change game info
    public function change(Request $request, $slug) {
        $game = Game::where('slug', $slug)->first();

        if ($game) {
            if ($game->user_id == Auth::user()->id) {
                $game->title = $request->title;
                $game->description = $request->description;
                $game->save();

                return response()->json([
                    'status' => 'success',
                ], 200);
            } 

            return response()->json([
                "status" => "forbidden",     
                "message" => "You are not the game author"
            ], 403);
        } 

        return response()->json([
            "status" => "not-found",     
            "slug" => "Not found"
        ], 404);
    }

    // ! game delete
    public function delete(Request $request, $slug) {
        if (Game::where('slug', $slug)->first()) {
            $game = Game::where('slug', $slug)->first();

            if ($game->user_id == Auth::user()->id) {
                $game->delete();
                return response()->json('', 204);
            } else {
                return response()->json([
                    "status" => "forbidden",     
                    "message" => "You are not the game author"
                ], 403);
            }
        } else {
            return response()->json([
                "status" => "not-found",     
                "slug" => "Not found"
            ], 404);
        }
    }
}
