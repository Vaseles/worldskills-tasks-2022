<?php

namespace App\Http\Controllers;

use App\Http\Requests\GameRequest;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GameController extends Controller
{
    public function index(Request $request) {
        $games = Game::all();

        return response()->json([
            'page'=> 0,
            'size'=> 10,
            'totalElements' => 15,
            'content' => $games
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
        if (Game::where('slug', $slug)->first()) {
            $game = Game::where('slug', $slug)->first();

            return response()->json([
                'slug' => $game->slug,
                'title' => $game->title,
                'description' => $game->description,
                'thumbnail' => '',
                'uploadTimestamp' => $game->uploadTimestamp,
                'author' => $game->user->username,
                'scoreCount' => 0,
                'gamePath' => ''
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
        if (Game::where('slug', $slug)->first()) {
            $game = Game::where('slug', $slug)->first();

            if ($game->user_id == Auth::user()->id) {
                $game->title = $request->title;
                $game->description = $request->description;
                $game->save();

                return response()->json([
                    'status' => 'success',
                ], 204);
            } else {
                return response()->json([
                    "status" => "forbidden",     
                    "message" => "You are not the game author"
                ]);
            }
        } else {
            return response()->json([
                "status" => "not-found",     
                "slug" => "Not found"
            ], 404);
        }
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
                ]);
            }
        } else {
            return response()->json([
                "status" => "not-found",     
                "slug" => "Not found"
            ], 404);
        }
    }
}
