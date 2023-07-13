<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameVersion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use ZipArchive;

class GameVersionController extends Controller
{
    public function upload(Request $request, $slug) {
        $game = Game::where('slug', $slug)->first();
        if ($game) {
            if ($game->user_id == Auth::user()->id) {
                if ($request->zipfile)  {

                    $file = $request->zipfile;
                    $imageFile =  Str::random(32).'.'.$request->zipfile->getClientOriginalExtension();

                    $path = public_path('files');
                    $file->move($path, $imageFile);
                    $zipFile = 'files/' . $imageFile;

                    $zip = new ZipArchive;
                    if ($zip->open($zipFile) === true) {
                        // Extract all files to the specified path
                        $zip->extractTo('files');

                        $version = GameVersion::create([
                            'game_id' => $game->id,
                            'files_path' => '/files/'.substr($request->zipfile->getClientOriginalName(), 0, -4).'/v1/index.html'
                        ]);
                        
                        // Close the ZIP file
                        $zip->close();
                        return response()->json($version->files_path, 201);
                    } 
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Failed to open the ZIP file.'
                    ], 400);
                } 

                return response()->json([
                    "status" => "not-found",     
                    "message" => "file not found",
                ], 400);
            } 

            return response()->json([
                "status" => "forbidden",     
                "message" => "You are not the game author"
            ], 403);
        } else {
            return response()->json([
                "status" => "not-found",     
                "slug" => "Not found"
            ], 404);
        }
    }

    public function show(Request $request, $slug, $version) {
        $game = Game::where('slug', $slug)->first();

        if ($game) {
            $game_version = GameVersion::find('id', $version);
            
           if ($game_version) {
                return response()->json($game_version->files_path, 200);
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
